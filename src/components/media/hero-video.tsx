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
 *   - playback retried when the tab becomes visible again, and once more after
 *     the first user gesture, because autoplay can be refused until then
 *
 * Responsive delivery (90% of traffic is mobile):
 *   - Desktop loads the approved 16:9 clip.
 *   - Phones load `heroMedia.videoMobile` — a portrait, lightweight cut. Until
 *     that file exists it is `null`, and the hero then shows the poster only on
 *     phones: nothing is downloaded, saving ~1.7 MB of cellular data per visit.
 *   - Reduced motion and Data Saver also fall back to the poster.
 *
 * The `<video>` element is always in the DOM (so its decorative semantics are
 * stable) but its `src` is assigned in the effect, so no clip is fetched on a
 * viewport that should not play one.
 *
 * Opacity is driven by the `playing` state, not by `canplay`. If autoplay is
 * refused — iOS Low Power Mode, for instance — the element stays transparent and
 * the crisp poster shows through, instead of a frozen first frame.
 */

interface NetworkInformation {
  saveData?: boolean
}

/** Matches the design's `mobil` breakpoint (< 720px). */
const MOBILE_QUERY = '(max-width: 719px)'

function prefersLightMedia(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection
  return connection?.saveData === true
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const isMobile = window.matchMedia(MOBILE_QUERY).matches
    const source = isMobile ? heroMedia.videoMobile : heroMedia.video

    // No clip for this viewport (mobile before the light cut ships), reduced
    // motion, or Data Saver: leave the poster in place and download nothing.
    if (!source || reduced || prefersLightMedia()) {
      // `playing` is already false; just make sure nothing is mid-play.
      video.pause()
      return
    }

    // Safari honours the property, not just the attribute, for muted autoplay.
    video.muted = true
    video.defaultMuted = true
    video.src = source

    const play = () => {
      void video.play().catch(() => {
        // Autoplay refused; the poster remains visible and we retry on gesture.
      })
    }
    const onPlaying = () => setPlaying(true)
    const onCanPlay = () => play()
    const onVisibility = () => {
      if (!document.hidden) play()
    }

    video.addEventListener('playing', onPlaying)
    video.addEventListener('canplay', onCanPlay)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointerdown', play, { once: true })
    window.addEventListener('keydown', play, { once: true })

    // `preload="none"` in the markup keeps the video off the critical path;
    // loading starts only once the page has hydrated.
    video.load()

    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', onCanPlay)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointerdown', play)
      window.removeEventListener('keydown', play)
    }
  }, [reduced])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
      style={{ opacity: playing && !reduced ? 1 : 0 }}
    />
  )
}
