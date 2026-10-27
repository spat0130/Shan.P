import { useRef } from 'react'
import PageShell from '../components/PageShell'
import Icon from '../components/Icon'
import { gsap } from '../lib/smoothScroll'
import { reveal, usePageMotion } from '../lib/motion'
import { focusAreas, moreProjects, pages, projects } from '../data/site'

const spotlight = projects.filter((p) => p.spotlight)
const rest = projects.filter((p) => !p.spotlight)

export default function Projects() {
  const ref = useRef(null)

  // Holographic cards float up and tilt into place one by one.
  usePageMotion(ref, () => {
    reveal('.focus-areas li', '.focus-areas', { y: 0, scale: 0.8, stagger: 0.05, duration: 0.5 })
    reveal('.spotlight__item', '.spotlight', { y: 60, stagger: 0.15, duration: 1 })
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        rotateX: 18,
        autoAlpha: 0,
        transformPerspective: 900,
        duration: 1,
        delay: (i % 3) * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
      })
    })
    reveal('.more-projects li', '.more-projects', { y: 20, stagger: 0.04, duration: 0.6 })
  })

  return (
    <PageShell page={pages[2]}>
      <div ref={ref} data-motion="custom" className="projects-body">
        <ul className="focus-areas" aria-label="Focus areas">
          {focusAreas.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <h2 className="label">Industry spotlight</h2>
        <ul className="spotlight">
          {spotlight.map((p) => (
            <li key={p.id} className="spotlight__item">
              <p className="spotlight__client">{p.client}</p>
              <p className="spotlight__context">{p.context} · {p.year}</p>
              <h3>{p.title}</h3>
              <p className="spotlight__badge"><Icon name="chart" size={16} /> {p.highlight}</p>
              <p>{p.summary}</p>
              <ul className="project-card__tags">
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </li>
          ))}
        </ul>

        <h2 className="label">Selected work</h2>
        <ul className="project-grid">
          {rest.map((p, i) => (
            <li key={p.id} className="project-card">
              <div className="project-card__thumb" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
                {p.highlight && <span className="project-card__badge">{p.highlight}</span>}
              </div>
              <p className="project-card__category">{p.category} · {p.year}</p>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <ul className="project-card__tags">
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {p.link && (
                <a href={p.link} className="project-card__link" aria-label={`View ${p.title}`}>
                  View project <Icon name="arrow" size={16} />
                </a>
              )}
            </li>
          ))}
        </ul>

        <h2 className="label more-projects__title">More projects</h2>
        <ul className="more-projects">
          {moreProjects.map((p) => (
            <li key={p.title}>
              <span className="more-projects__year">{p.year}</span>
              <span className="more-projects__name">
                {p.title}
                {p.note && <small>{p.note}</small>}
              </span>
              <span className="more-projects__category">{p.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
