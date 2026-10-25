import { gsap, ScrollTrigger } from './smoothScroll'

// Every scroll animation on the page. Runs only when the visitor hasn't asked
// for reduced motion; `mm.revert()` undoes everything (inline styles, pins).
export function initAnimations() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', (context) => {
    // The first screen animates straight away. Everything below the fold is
    // set up one scene per task so page load isn't one long blocking task.
    progressBar()
    arrival()
    const rest = [ready, dismount, walk, builder, projects, connect, sceneExits, sceneRail]
    let timer
    const next = () => {
      const setup = rest.shift()
      if (!setup) return ScrollTrigger.refresh()
      context.add(setup)
      timer = setTimeout(next, 0)
    }
    timer = setTimeout(next, 0)
    return () => clearTimeout(timer)
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

// Draw strokes in (stroke-dashoffset 1 -> 0). Every `.draw` has pathLength=1.
function draw(targets, vars = {}) {
  return gsap.fromTo(targets, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'power2.inOut', ...vars })
}

// Nodes and dots pop in from nothing.
function pop(targets, vars = {}) {
  return gsap.from(targets, { scale: 0, transformOrigin: 'center', ease: 'back.out(2)', ...vars })
}

// 01: rings draw in around the monogram, then fly past the camera as you scroll.
function arrival() {
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
  intro
    .add(draw('#arrival .draw', { duration: 1.8, stagger: 0.12 }), 0)
    .from('#arrival .monogram', { autoAlpha: 0, scale: 0.6, transformOrigin: 'center', duration: 1.2 }, 0.6)
    .add(pop('#arrival .dot', { duration: 0.6, stagger: 0.2 }), 1.2)
    .from('.arrival__name span', { yPercent: 110, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 0.3)
    .from('#arrival .eyebrow, .arrival__role, .arrival__location, .scroll-cue', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.8)

  gsap.timeline({
    scrollTrigger: { trigger: '#arrival', start: 'top top', end: '+=100%', scrub: true, pin: true },
  })
    .to('#arrival .visual', { scale: 2.4, autoAlpha: 0, ease: 'power1.in' }, 0)
    .to('#arrival .scene__content', { y: -120, autoAlpha: 0, ease: 'power1.in' }, 0)
}

// 02: each chevron draws and lights up as its principle locks in.
function ready() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#ready', start: 'top top', end: '+=150%', scrub: 0.6, pin: true },
  })
  tl.add(draw('#ready .faint', { duration: 3, ease: 'none' }), 0)
    .from('#ready .eyebrow, #ready .scene__title', { x: 60, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 0)
  gsap.utils.toArray('#ready .principles li').forEach((li, i) => {
    const at = 0.6 + i * 0.5
    tl.from(li, { x: 60, autoAlpha: 0, duration: 0.6 }, at)
      .add(draw(`#ready .chevron:nth-of-type(${i + 1})`, { duration: 0.6 }), at)
      .add(pop(`#ready .node:nth-of-type(${i + 1})`, { duration: 0.4 }), at + 0.3)
  })
  tl.to('#ready .visual', { xPercent: 6, ease: 'none', duration: 3 }, 0)
}

// 03: the code brackets give way to a growing bar chart; stats count up.
function dismount() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#dismount', start: 'top 80%', end: 'top 10%', scrub: 0.8 },
  })
  tl.add(draw('#dismount .code .draw', { duration: 1, stagger: 0.15 }), 0)
    .add(draw('#dismount .arrow', { duration: 0.6 }), 0.8)
    .add(draw('#dismount .bars .faint', { duration: 0.6 }), 1)
    .from('#dismount .bars rect', { scaleY: 0, transformOrigin: '50% 100%', stagger: 0.12, duration: 0.8, ease: 'power2.out' }, 1.1)
    .set('#dismount .bars rect', { strokeDashoffset: 0 }, 0)
    .to('#dismount .code', { autoAlpha: 0.35, duration: 0.8 }, 1.4)
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

// 04: the route draws itself through each stop as the milestones step in.
function walk() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#walk', start: 'top 75%', end: 'center 40%', scrub: 0.8 },
  })
  tl.add(draw('#walk .route', { duration: 3, ease: 'none' }), 0)
  gsap.utils.toArray('#walk .stop').forEach((stop, i) => {
    tl.add(draw(stop.querySelector('.draw'), { duration: 0.3 }), i * 0.5)
      .add(pop(stop.querySelector('.node'), { duration: 0.3 }), i * 0.5 + 0.15)
  })
  reveal('#walk .eyebrow, #walk .scene__title', '#walk')
  reveal('#walk .timeline li', '#walk .timeline', { y: 60, stagger: 0.15 })
}

// 05: the skills network wires itself up, then turns slowly with the scroll.
function builder() {
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#builder', start: 'top 70%', once: true } })
  tl.add(draw('#builder .visual > .draw', { duration: 1.4 }), 0)
    .add(pop('#builder .node', { duration: 0.5, stagger: 0.06 }), 0.2)
    .add(draw('#builder .links .draw', { duration: 1, stagger: 0.04 }), 0.4)
  gsap.fromTo(
    '#builder .visual',
    { rotate: -12 },
    { rotate: 12, ease: 'none', scrollTrigger: { trigger: '#builder', start: 'top bottom', end: 'bottom top', scrub: true } },
  )
  reveal('#builder .scene__content > :not(.chips, .quote)', '#builder')
  reveal('#builder .chips li', '#builder .chips', { y: 16, scale: 0.9, stagger: 0.04, duration: 0.5 })
  reveal('#builder .quote', '#builder .quote')
}

// 06: the grid floor draws in and the holographic cards float up from it.
function projects() {
  draw('.projects__bg .draw', {
    duration: 1.6,
    stagger: 0.02,
    scrollTrigger: { trigger: '.projects', start: 'top 70%', once: true },
  })
  gsap.to('.projects__bg', {
    yPercent: -12,
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

// 07: connections reach out from the centre as the contact links light up.
function connect() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#connect', start: 'top 70%', end: 'center center', scrub: 0.8 },
  })
  tl.add(draw('#connect .faint', { duration: 1 }), 0)
    .add(pop('#connect .node--hub', { duration: 0.3 }), 0)
    .add(draw('#connect .spokes .draw', { duration: 0.8, stagger: 0.06 }), 0.3)
    .add(pop('#connect .node:not(.node--hub)', { duration: 0.3, stagger: 0.06 }), 0.6)
  gsap.to('#connect .visual', {
    rotate: 30,
    ease: 'none',
    scrollTrigger: { trigger: '#connect', start: 'top bottom', end: 'bottom bottom', scrub: true },
  })
  reveal('#connect .scene__content > :not(.connect__links)', '#connect')
  reveal('.connect__links li', '.connect__links', { y: 24, stagger: 0.1 })
}

// Each symbol fades as its scene scrolls away, so scenes crossfade into one another.
function sceneExits() {
  ;['dismount', 'walk', 'builder'].forEach((id) => {
    gsap.to(`#${id} .scene__media`, {
      autoAlpha: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: `#${id}`, start: 'center top', end: 'bottom top', scrub: true },
    })
  })
}
