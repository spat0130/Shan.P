import { useLayoutEffect, useRef } from 'react'
import Badge from '../components/Badge'
import Icon from '../components/Icon'
import { ArrivalVisual } from '../components/Visuals'
import { Link } from '../lib/router'
import { gsap, reducedMotion } from '../lib/smoothScroll'
import { reveal } from '../lib/motion'
import { badges, explore, highlights, principles, profile } from '../data/site'

// Two screens: the title page with badge links, then one scroll to "what's
// this about". Everything else lives on its own short URL.
export default function Home({ ready }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ready || reducedMotion()) return
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .fromTo('.hero .visual .draw', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.1 }, 0)
        .from('.hero__first', { y: 30, autoAlpha: 0, letterSpacing: '0.6em', duration: 1.2 }, 0.1)
        .from('.hero__last span', { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.2)
        .from('.hero__role', { y: 20, autoAlpha: 0, duration: 0.8 }, 0.7)
        .from('.hero__badges--left li', { x: -140, rotate: -90, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.5)
        .from('.hero__badges--right li', { x: 140, rotate: 90, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.5)
        .from('.highlights li', { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.9)
        .from('.scroll-cue', { autoAlpha: 0, duration: 0.8 }, 1.2)
        .fromTo('.scroll-cue path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, 1.2)

      // Scrolling away: the title drifts up and dims while the rings widen.
      gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        .to('.hero__title', { yPercent: -30, autoAlpha: 0.15, ease: 'none' }, 0)
        .to('.hero .visual', { scale: 1.5, autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero__badges--left', { x: -60, autoAlpha: 0, ease: 'none' }, 0)
        .to('.hero__badges--right', { x: 60, autoAlpha: 0, ease: 'none' }, 0)

      reveal('.about-strip__title, .about-strip__lead', '.about-strip')
      reveal('.about-strip .principles li', '.about-strip .principles', { stagger: 0.12 })
      reveal('.about-strip .quote', '.about-strip .quote')
      reveal('.explore li', '.explore', { y: 60, stagger: 0.12 })
    }, ref)
    return () => ctx.revert()
  }, [ready])

  return (
    <div className="home" ref={ref}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__emblem"><ArrivalVisual /></div>

        <ul className="hero__badges hero__badges--left">
          {badges.left.map((b) => <li key={b.label}><Badge {...b} /></li>)}
        </ul>

        <div className="hero__center">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__first">Hello, I&apos;m</span>
            <span className="hero__last" aria-label={`${profile.firstName} ${profile.lastName[0]}.`}>
              {[...profile.firstName].map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}
              <span className="hero__initial" aria-hidden="true">{profile.lastName[0]}.</span>
            </span>
          </h1>
          <p className="hero__role">{profile.role}</p>
        </div>

        <ul className="hero__badges hero__badges--right">
          {badges.right.map((b) => <li key={b.label}><Badge {...b} /></li>)}
        </ul>

        <ul className="highlights">
          {highlights.map((h) => (
            <li key={h.value}>
              <strong>{h.value}</strong>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>

        <a href="#about-strip" className="scroll-cue">
          <svg viewBox="0 0 120 160" fill="none" aria-hidden="true">
            <path pathLength="1" d="M110 6 C 50 20, 14 70, 22 154" />
          </svg>
          <span>What's this about?</span>
        </a>
      </section>

      <section id="about-strip" className="about-strip" aria-labelledby="about-strip-title">
        <h2 id="about-strip-title" className="about-strip__title">What's this about?</h2>
        <p className="about-strip__lead">{profile.intro}</p>
        <ul className="principles principles--row">
          {principles.map((p) => (
            <li key={p.label}>
              <Icon name="chevrons" size={22} />
              <div>
                <h3>{p.label}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <figure className="quote">
          <blockquote>“{profile.quote.text}”</blockquote>
          <figcaption>
            <strong>{profile.quote.author}</strong> · {profile.quote.role}
          </figcaption>
        </figure>
        <ul className="explore">
          {explore.map((p) => (
            <li key={p.path}>
              <Link to={p.path}>
                <Icon name={p.icon} size={36} />
                <span className="explore__title">{p.title}</span>
                <span className="explore__eyebrow">{p.eyebrow}</span>
                <Icon name="arrow" size={24} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
