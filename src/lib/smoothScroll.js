import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Mobile address bars resize the viewport while scrolling; don't re-measure for that.
ScrollTrigger.config({ ignoreMobileResize: true })

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

// Lenis drives the scroll, GSAP's ticker drives Lenis, and ScrollTrigger
// updates on every Lenis scroll.
export function initSmoothScroll() {
  if (reducedMotion()) return () => {}

  lenis = new Lenis({ lerp: 0.1, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function setScrollLocked(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export { gsap, ScrollTrigger }
