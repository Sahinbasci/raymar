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
 *   - Phones load `heroMedia.videoMobile` — a portrait, lightweight cut
 *     (~784 KB) in place of the 1.73 MB desktop clip. The source is re-picked
 *     on every `mobil`-breakpoint crossing, not just once at mount, so a
 *     rotated phone never gets stuck on the wrong cut.
 *   - Reduced motion and Data Saver fall back to the poster on every
 *     viewport and download nothing.
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

    // Reduced motion or Data Saver: leave the poster in place and download
    // nothing, regardless of viewport.
    if (reduced || prefersLightMedia()) {
      video.pause()
      return
    }

    // Safari honours the property, not just the attribute, for muted autoplay.
    video.muted = true
    video.defaultMuted = true

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

    const mobileQuery = window.matchMedia(MOBILE_QUERY)

    /*
     * Re-run on every `mobil` breakpoint crossing, not just at mount — a
     * width-only check taken once left a phone rotated mid-visit on whichever
     * clip it started with: portrait-to-landscape kept the light cut (fine),
     * but landscape-to-portrait kept the 1.73 MB desktop clip downloading on a
     * phone, exactly the cellular cost this component exists to avoid.
     */
    const applySource = () => {
      const source = mobileQuery.matches ? heroMedia.videoMobile : heroMedia.video

      // No clip for this viewport (mobile before the light cut ships): leave
      // the poster in place and download nothing.
      if (!source) {
        video.pause()
        return
      }
      // Same clip already assigned (or being fetched) — a no-op resize inside
      // the same bucket must not re-trigger a download.
      if (video.src.endsWith(source)) return

      // Cleared *before* the new source loads, not after: `playing` gates the
      // element's opacity, and leaving it `true` across the swap would hold
      // the old, now-stale frame on screen instead of the poster while the new
      // clip buffers.
      setPlaying(false)
      video.src = source
      // `preload="none"` in the markup keeps the video off the critical path;
      // loading starts only once this effect runs, post-hydration.
      video.load()
    }

    video.addEventListener('playing', onPlaying)
    video.addEventListener('canplay', onCanPlay)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointerdown', play, { once: true })
    window.addEventListener('keydown', play, { once: true })
    mobileQuery.addEventListener('change', applySource)

    applySource()

    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', onCanPlay)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointerdown', play)
      window.removeEventListener('keydown', play)
      mobileQuery.removeEventListener('change', applySource)
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
