import { gsap, ScrollTrigger } from './smoothScroll'

// Every scroll animation on the page. Runs only when the visitor hasn't asked
// for reduced motion; `mm.revert()` undoes everything (inline styles, pins).
export function initAnimations() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    progressBar()
    sceneRail()
    arrival()
    ready()
    dismount()
    walk()
    builder()
    projects()
    connect()
    sceneExits()
  })

  // Pins change page height, so re-measure once webfonts settle.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => mm.revert()
}

// Fade-and-rise for a group of elements as they enter the viewport.
function reveal(targets, trigger, vars = {}) {
  return gsap.from(targets, {
    y: 40,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger, start: 'top 75%', once: true },
    ...vars,
  })
}

function progressBar() {
  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: true },
  })
}

// Highlight the current scene number in the side rail.
function sceneRail() {
  document.querySelectorAll('main > section').forEach((section) => {
    const link = document.querySelector(`.scene-progress a[href="#${section.id}"]`)
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => link?.classList.toggle('is-active', isActive),
    })
  })
}

// 01: name rises in on load, then the rider rolls toward camera as you scroll.
function arrival() {
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
  intro
    .from('#arrival .scene__bg', { scale: 1.25, duration: 2.2, ease: 'power2.out' })
    .from('.arrival__name span', { yPercent: 110, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 0.3)
    .from('#arrival .eyebrow, .arrival__role, .arrival__location, .scroll-cue', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.8)

  gsap.timeline({
    scrollTrigger: { trigger: '#arrival', start: 'top top', end: '+=100%', scrub: true, pin: true },
  })
    .to('#arrival .scene__bg', { scale: 1.35, ease: 'none' }, 0)
    .to('#arrival .scene__content', { y: -120, autoAlpha: 0, ease: 'power1.in' }, 0)
}

// 02: camera pushes in on the helmet while each principle locks in.
function ready() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#ready', start: 'top top', end: '+=150%', scrub: 0.6, pin: true },
  })
  tl.fromTo('#ready .scene__bg', { scale: 1.05 }, { scale: 1.3, ease: 'none', duration: 3 }, 0)
    .from('#ready .eyebrow, #ready .scene__title', { x: 60, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 0)
    .from('#ready .principles li', { x: 60, autoAlpha: 0, stagger: 0.5, duration: 0.6 }, 0.6)
}

// 03: the frame slides sideways as he swings off the bike; stats count up.
function dismount() {
  gsap.fromTo(
    '#dismount .scene__bg',
    { scale: 1.15, xPercent: 6 },
    { xPercent: -6, ease: 'none', scrollTrigger: { trigger: '#dismount', start: 'top bottom', end: 'bottom top', scrub: true } },
  )
  reveal('#dismount .scene__content > *', '#dismount')

  document.querySelectorAll('#dismount .stats dd').forEach((el) => {
    const match = el.textContent.match(/^(\d+)(.*)$/)
    if (!match) return
    const [, num, suffix] = match
    const counter = { value: 0 }
    gsap.to(counter, {
      value: Number(num),
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(counter.value)).padStart(num.length, '0') + suffix },
    })
  })
}

// 04: he walks toward us (image grows) and the milestones step in one by one.
function walk() {
  gsap.fromTo(
    '#walk .scene__bg',
    { scale: 1 },
    { scale: 1.2, ease: 'none', scrollTrigger: { trigger: '#walk', start: 'top bottom', end: 'bottom top', scrub: true } },
  )
  reveal('#walk .eyebrow, #walk .scene__title', '#walk')
  reveal('#walk .timeline li', '#walk .timeline', { y: 60, stagger: 0.15 })
}

// 05: slow drift on the portrait, bio and chips reveal.
function builder() {
  gsap.fromTo(
    '#builder .scene__bg',
    { yPercent: -6, scale: 1.12 },
    { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '#builder', start: 'top bottom', end: 'bottom top', scrub: true } },
  )
  reveal('#builder .scene__content > :not(.chips, .quote)', '#builder')
  reveal('#builder .chips li', '#builder .chips', { y: 16, scale: 0.9, stagger: 0.04, duration: 0.5 })
  reveal('#builder .quote', '#builder .quote')
}

// 06: holographic cards float up out of the skyline.
function projects() {
  gsap.to('.projects__bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.projects', start: 'top bottom', end: 'bottom top', scrub: true },
  })
  reveal('.projects .eyebrow, .projects .scene__title', '.projects')
  reveal('.focus-areas li', '.focus-areas', { y: 0, scale: 0.8, stagger: 0.06, duration: 0.5 })

  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      y: 100,
      rotateX: 18,
      autoAlpha: 0,
      transformPerspective: 900,
      duration: 1,
      delay: (i % 3) * 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', once: true },
    })
  })
  reveal('.more-projects__title', '.more-projects__title')
  reveal('.more-projects li', '.more-projects', { y: 20, stagger: 0.05, duration: 0.6 })
}

// 07: skyline settles as the contact links light up.
function connect() {
  gsap.fromTo(
    '#connect .scene__bg',
    { scale: 1.2, yPercent: 8 },
    { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: '#connect', start: 'top bottom', end: 'bottom bottom', scrub: true } },
  )
  reveal('#connect .scene__content > :not(.connect__links)', '#connect')
  reveal('.connect__links li', '.connect__links', { y: 24, stagger: 0.1 })
}

// Each full-bleed frame dims as it scrolls away, so scenes crossfade into one another.
function sceneExits() {
  ;['dismount', 'walk', 'builder'].forEach((id) => {
    gsap.to(`#${id} .scene__media`, {
      autoAlpha: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: `#${id}`, start: 'center top', end: 'bottom top', scrub: true },
    })
  })
}
