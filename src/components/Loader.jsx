import { useLayoutEffect, useRef } from 'react'
import { gsap, setScrollLocked } from '../lib/smoothScroll'
import { markIntroSeen } from '../lib/intro'
import { profile } from '../data/site'

const D = { pathLength: 1, className: 'draw' }

// Played once per visit: a sun rises over the horizon, its rays draw out,
// the monogram settles, and the screen splits open along the horizon.
export default function Loader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useLayoutEffect(() => {
    setScrollLocked(true)
    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          markIntroSeen()
          setScrollLocked(false)
          onDone()
        },
      })
      tl.fromTo('.loader .horizon', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7 }, 0)
        .fromTo('.loader .sun', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9 }, 0.3)
        .from('.loader .sun-fill', { y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out' }, 0.5)
        .fromTo('.loader .ray', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.06 }, 0.9)
        .from('.loader .monogram', { y: 16, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, 1.1)
        .from('.loader__meta', { autoAlpha: 0, y: 10, duration: 0.6 }, 0.2)
        .to(counter, {
          value: 100,
          duration: 2.1,
          ease: 'power1.inOut',
          onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, '0') },
        }, 0)
        .to('.loader__emblem', { scale: 1.08, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 2.2)
        .to('.loader__meta', { autoAlpha: 0, duration: 0.3 }, 2.2)
        .to('.loader__half--top', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 2.5)
        .to('.loader__half--bottom', { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, 2.5)
    }, root)
    return () => {
      ctx.revert()
      setScrollLocked(false)
    }
  }, [onDone])

  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <div className="loader__half loader__half--top" />
      <div className="loader__half loader__half--bottom" />
      <svg className="loader__emblem" viewBox="0 0 400 260" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="above-horizon"><rect x="0" y="0" width="400" height="180" /></clipPath>
          <radialGradient id="sun-glow" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#ffc56b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <g clipPath="url(#above-horizon)">
          <circle className="sun-fill" cx="200" cy="180" r="62" fill="url(#sun-glow)" />
        </g>
        <path className="draw sun" pathLength="1" d="M138 180 A62 62 0 0 1 262 180" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI + (i / 8) * Math.PI
          const r1 = 80
          const r2 = i % 2 ? 104 : 124
          return (
            <line
              key={i}
              {...D}
              className="draw ray"
              x1={200 + Math.cos(a) * r1}
              y1={180 + Math.sin(a) * r1}
              x2={200 + Math.cos(a) * r2}
              y2={180 + Math.sin(a) * r2}
            />
          )
        })}
        <line {...D} className="draw horizon" x1="20" y1="180" x2="380" y2="180" />
        <text className="monogram" x="200" y="236" textAnchor="middle">SP</text>
      </svg>
      <div className="loader__meta">
        <span>{profile.name}</span>
        <span className="loader__count" ref={count}>000</span>
      </div>
    </div>
  )
}
