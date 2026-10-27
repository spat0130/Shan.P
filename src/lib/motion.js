import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from './smoothScroll'

// Fade-and-rise for a group of elements as they enter the viewport.
export function reveal(targets, trigger, vars = {}) {
  return gsap.from(targets, {
    y: 40,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger, start: 'top 85%', once: true },
    ...vars,
  })
}

// Draw every line-art symbol inside `scope` when it scrolls into view:
// strokes (pathLength=1) draw in, then nodes and dots pop.
export function drawVisuals(scope) {
  scope.querySelectorAll('.visual').forEach((svg) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 85%', once: true } })
    const strokes = svg.querySelectorAll('.draw')
    const dots = svg.querySelectorAll('.node, .dot')
    if (strokes.length) {
      tl.fromTo(strokes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: { amount: 0.8 } }, 0)
    }
    if (dots.length) {
      tl.from(dots, { scale: 0, transformOrigin: 'center', duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.5 } }, 0.5)
    }
  })
}

// Run a page's animations inside a GSAP context scoped to `ref`, skipped for
// reduced motion and cleaned up when the page unmounts.
export function usePageMotion(ref, setup, deps = []) {
  useLayoutEffect(() => {
    if (reducedMotion() || !ref.current) return
    const ctx = gsap.context(() => setup(ref.current), ref)
    ScrollTrigger.refresh()
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
