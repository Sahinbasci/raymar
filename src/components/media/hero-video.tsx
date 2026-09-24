'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { heroMedia } from '@/data/products'

/**
 * Cinematic hero background.
 *
 * Behaviour carried over from the approved design:
 *   - muted, looping, inline, no native controls, `object-fit: cover`
 *   - decorative: `aria-hidden` and removed from the tab order, so the section's
 *     text carries all meaning and the page reads correctly without playback
 *
 * Responsive delivery (90% of traffic is mobile):
 *   - Desktop loads the approved 16:9 clip.
 *   - Phones load `heroMedia.videoMobile` — a portrait, lightweight cut
 *     (~784 KB) in place of the 1.73 MB desktop clip. The source is re-picked
 *     on every `mobil`-breakpoint crossing, not just once at mount, so a
 *     rotated phone never gets stuck on the wrong cut.
 *   - Reduced motion and Data Saver download nothing and show the poster,
 *     until the visitor asks for the clip with the play control.
 *
 * The `<video>` element is always in the DOM (so its decorative semantics are
 * stable) but its `src` is assigned in the effect, so no clip is fetched on a
 * viewport that should not play one.
 *
 * ## Why playback is requested at once and shown later
 *
 * The clip used to be started only after the browser reported it could play
 * through without stalling (`canplaythrough`, or the whole file buffered). On
 * a fast link that is the same moment. On iPhones and iPads it can be never:
 * WebKit on iOS does not buffer media data ahead of a `play()` call
 * (`MediaDataLoadsAutomatically` is false there, which caps any preload at
 * metadata — `HTMLMediaElement.cpp`, `MediaElementSession.cpp`), and Android
 * Chrome's data-saving preload heuristics can suspend a load the same way. The
 * code was waiting for a buffer that only `play()` would have filled, and the
 * gesture retry waited for the same buffer, so a tap could not rescue it
 * either. That is the "video sometimes doesn't start" report: which devices and
 * which visits hit it depended on engine, power state and network.
 *
 * So `play()` is called as soon as the clip is assigned — the one request every
 * engine honours — and what waits for the buffer is only the *reveal*. The
 * video stays transparent over the poster until the download shows it can play
 * to the end without freezing (see `smooth`). Having played unseen until then,
 * it is rewound to its first frame — the frame the poster was cut from — so the
 * hand-off is seamless, and it then plays from a buffer that is already ahead
 * of it. On a weak signal the reader sees the still poster until the motion
 * can run smoothly, never a picture that keeps freezing.
 *
 * ## When the browser refuses
 *
 * iOS refuses autoplay in Low Power Mode and under thermal pressure
 * (`RequireUserGestureForVideoDueToLowPowerMode`, `…AggressiveThermalMitigation`).
 * Every tap, click or key press retries — a play request inside a gesture is
 * allowed — until playback starts. The control in the corner states the
 * situation plainly (it shows "play"), and doubles as the pause control WCAG
 * 2.2.2 requires for motion that starts on its own and runs longer than five
 * seconds.
 *
 * ## While it is not being watched
 *
 * Playback pauses while the hero is off screen and resumes when it returns,
 * so a phone does not decode video behind three screens of text; it is also
 * resumed when the tab becomes visible again or the page is restored from the
 * back/forward cache. A visitor who paused it keeps it paused for the rest of
 * the visit.
 */

interface NetworkInformation {
  saveData?: boolean
}

interface HeroVideoProps {
  /** Accessible name of the control while the clip plays. */
  pauseLabel: string
  /** Accessible name of the control while it does not. */
  playLabel: string
}

/** Matches the design's `mobil` breakpoint (< 720px). */
const MOBILE_QUERY = '(max-width: 719px)'

/** Events on which a paused clip is asked to play again. */
const GESTURES = ['pointerup', 'touchend', 'keydown'] as const

/**
 * How the measured download rate is read before it is trusted (see `smooth`).
 *
 * The rate is measured over the last few seconds; what decides whether the
 * clip freezes is the rate over the seconds still to come, on a link that
 * fluctuates and against a variable bitrate. So the reading is discounted, and
 * the clip is never revealed without a head start in hand — not even when the
 * download appears to be outrunning playback. Measured on a 160 kB/s link
 * against the 222 kB/s desktop cut, the earlier values (no discount, 1.5 s)
 * revealed a clip that then stalled once.
 */
const RATE_DISCOUNT = 0.85
const HEAD_START_SECONDS = 2.5

/**
 * The visitor's own choice, kept for the rest of the visit. Module state
 * survives client-side navigation, so a clip paused on purpose is still paused
 * when the reader comes back to the homepage; a full reload starts clean.
 */
let visitorChoice: 'play' | 'pause' | null = null

function prefersLightMedia(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection
  return connection?.saveData === true
}

export function HeroVideo({ pauseLabel, playLabel }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<() => void>(() => {})
  /** The clip is on screen over the poster. */
  const [shown, setShown] = useState(false)
  /** The clip is playing, or asked to play: drives the control's label. */
  const [running, setRunning] = useState(false)
  /** A clip exists for this viewport, so the control has something to control. */
  const [available, setAvailable] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Safari honours the property, not just the attribute, for muted autoplay.
    video.muted = true
    video.defaultMuted = true

    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const clipForViewport = () =>
      mobileQuery.matches ? heroMedia.videoMobile : heroMedia.video

    const wanted = () =>
      visitorChoice === 'play' ||
      (visitorChoice === null && !reduced && !prefersLightMedia())

    let inView = true
    let visible = false
    let rewound = false
    /** The download has answered: the clip can run to the end. */
    let decided = false
    /** When playback last started without stalling since; `-1` while stalled. */
    let runningSince = -1
    /** Recent readings of how much of the clip has arrived, for its download rate. */
    let arrivals: Array<{ readonly at: number; readonly end: number }> = []

    /** Seconds of clip buffered without a gap from its first frame. */
    const bufferedFromStart = () => {
      const { buffered } = video
      for (let i = 0; i < buffered.length; i++) {
        if (buffered.start(i) <= 0.25) return buffered.end(i)
      }
      return 0
    }

    const recordArrival = () => {
      const now = performance.now()
      arrivals.push({ at: now, end: bufferedFromStart() })
      arrivals = arrivals.filter((reading) => now - reading.at <= 4000)
    }

    /** Seconds of clip arriving per second, or `null` before there is a trend. */
    const downloadRate = () => {
      const first = arrivals[0]
      const last = arrivals[arrivals.length - 1]
      if (!first || !last || last.at - first.at < 1200) return null
      return (last.end - first.end) / ((last.at - first.at) / 1000)
    }

    /*
     * Whether the clip, shown from its first frame, will play to the end
     * without freezing.
     *
     * The engines' own answer (`readyState` 4, `canplaythrough`) is an
     * estimate, and measured on a throttled link Firefox gives it early: the
     * clip froze twice after being shown. So the decision is taken from the
     * download itself. Played from the start, the clip gains on the download
     * by (1 − rate) seconds per second, so over its whole length it needs that
     * much buffered up front, plus a head start that is required whatever the
     * measured rate — the reading is a few seconds old and the bitrate varies
     * within the clip, so a rate above 1 is not a promise (see
     * `RATE_DISCOUNT`). Where no trend can be measured (an engine that reports
     * no progress), three seconds of unseen playback without a stall stands in
     * for it.
     */
    const smooth = () => {
      const { duration } = video
      if (!Number.isFinite(duration) || duration <= 0) return false
      const end = bufferedFromStart()
      if (end >= duration - 0.25) return true
      const rate = downloadRate()
      if (rate === null) {
        return runningSince >= 0 && performance.now() - runningSince >= 3000
      }
      const trusted = rate * RATE_DISCOUNT
      const needed = (trusted >= 1 ? 0 : duration * (1 - trusted)) + HEAD_START_SECONDS
      return end >= Math.min(needed, duration - 0.25)
    }

    /** Assigns this viewport's clip. `false` when there is none to play. */
    const attach = () => {
      const clip = clipForViewport()
      setAvailable(Boolean(clip))
      if (!clip) {
        video.pause()
        return false
      }
      // Same clip already assigned (or being fetched): a resize inside the
      // same bucket must not start a second download.
      if (video.src.endsWith(clip)) return true

      // Hidden *before* the new clip loads, so the poster — not a stale frame
      // of the other cut — shows while it buffers.
      visible = false
      rewound = false
      decided = false
      runningSince = -1
      arrivals = []
      setShown(false)
      video.preload = 'auto'
      video.src = clip
      video.load()
      return true
    }

    const play = () => {
      if (!wanted() || !inView || document.hidden) return
      if (!attach() || !video.paused) return
      void video.play().catch(() => {
        // Refused (autoplay policy, Low Power Mode) or interrupted by a pause
        // or a source change. The poster stays; the next gesture retries.
      })
    }

    const reveal = () => {
      recordArrival()
      if (visible || video.paused) return
      // Once the download says the clip can run, that answer stands: the
      // rewind below seeks, a seek stalls playback, and a stall is what the
      // rate estimate cannot see through. Re-asking after the seek would send
      // the clip back to the slow fallback and show it a second or two in.
      if (!decided) {
        if (!smooth()) return
        decided = true
      }
      if (!rewound && video.currentTime > 0.5) {
        rewound = true
        video.currentTime = 0
        return
      }
      visible = true
      setShown(true)
    }

    const onPlay = () => setRunning(true)
    const onPause = () => {
      runningSince = -1
      setRunning(false)
    }
    const onPlaying = () => {
      runningSince = performance.now()
    }
    const onWaiting = () => {
      runningSince = -1
      // A trend measured across a stall is not the link's rate: it averages
      // the gap with the burst that follows it. Measure again from here —
      // except after a seek, whose stall is this component's own rewind.
      if (!video.seeking) arrivals = []
    }
    const onError = () => {
      // A clip that cannot load leaves the poster, and nothing to control.
      if (video.error) setAvailable(false)
    }
    const onGesture = (event: Event) => {
      // The control handles its own press: retrying here as well started the
      // clip on the way down, and the click that followed paused it again.
      if (event.target instanceof Node && controlRef.current?.contains(event.target))
        return
      if (video.paused) play()
    }
    const onVisibility = () => {
      if (!document.hidden) play()
    }
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) play()
    }
    const onViewportBucket = () => {
      // Re-pick only a clip that is in use: a visitor who has not started
      // playback (reduced motion, Data Saver) downloads nothing on rotation.
      if (video.getAttribute('src') !== null || wanted()) {
        attach()
        play()
      } else {
        setAvailable(Boolean(clipForViewport()))
      }
    }

    toggleRef.current = () => {
      if (!video.paused) {
        visitorChoice = 'pause'
        video.pause()
        return
      }
      // Inside the click, so allowed even where autoplay is not.
      visitorChoice = 'play'
      play()
    }

    const REVEAL_EVENTS = [
      'playing',
      'canplaythrough',
      'progress',
      'timeupdate',
      'seeked',
    ]
    video.addEventListener('playing', onPlaying)
    video.addEventListener('waiting', onWaiting)
    for (const type of REVEAL_EVENTS) video.addEventListener(type, reveal)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('error', onError)
    for (const type of GESTURES)
      window.addEventListener(type, onGesture, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    mobileQuery.addEventListener('change', onViewportBucket)

    setAvailable(Boolean(clipForViewport()))
    if (!wanted() && !video.paused) video.pause()

    /*
     * The observer's first report starts playback, so a page opened below the
     * hero — a link to `#teklif`, a restored scroll position — downloads no
     * clip it is not showing. Some embedded viewports never deliver observer
     * callbacks at all; after a short grace the clip starts regardless.
     */
    let observerReported = false
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            observerReported = true
            inView = entry?.isIntersecting ?? true
            if (inView) play()
            else if (!video.paused) video.pause()
          })
    observer?.observe(video)
    const grace = window.setTimeout(() => {
      if (!observerReported) play()
    }, 300)

    return () => {
      window.clearTimeout(grace)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('waiting', onWaiting)
      for (const type of REVEAL_EVENTS) video.removeEventListener(type, reveal)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('error', onError)
      for (const type of GESTURES) window.removeEventListener(type, onGesture)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
      mobileQuery.removeEventListener('change', onViewportBucket)
      observer?.disconnect()
    }
  }, [reduced])

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
        style={{ opacity: shown ? 1 : 0 }}
      />
      {/* Rendered only once the effect knows a clip exists: no control
          before hydration that would do nothing when pressed. */}
      {available ? (
        <button
          ref={controlRef}
          type="button"
          onClick={() => toggleRef.current()}
          aria-label={running ? pauseLabel : playLabel}
          title={running ? pauseLabel : playLabel}
          className="hero-video-toggle absolute z-10 flex h-11 w-11 items-center justify-center rounded-none border border-raymar-white/35 bg-raymar-green-deep/20 text-raymar-white/85 backdrop-blur-[2px] transition-colors duration-300 hover:border-raymar-gold hover:text-raymar-gold"
        >
          {running ? (
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2.5 1v12M9.5 1v12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2 1.5v11l9-5.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="miter"
              />
            </svg>
          )}
        </button>
      ) : null}
    </>
  )
}
