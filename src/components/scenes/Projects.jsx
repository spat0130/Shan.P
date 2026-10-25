import { SceneHeading } from '../Scene'
import Icon from '../Icon'
import { focusAreas, moreProjects, projects } from '../../data/site'

// Not a full-bleed frame: the storyboard image becomes a dim backdrop behind
// a grid of glowing "holographic" project cards.
export default function Projects({ scene }) {
  return (
    <section id={scene.id} className="projects" aria-labelledby={`${scene.id}-title`}>
      <img className="projects__bg" src={scene.image.replace('.webp', '-960.webp')} alt="" loading="lazy" decoding="async" />
      <div className="projects__inner">
        <SceneHeading scene={scene} />
        <ul className="focus-areas" aria-label="Focus areas">
          {focusAreas.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <ul className="project-grid">
          {projects.map((p, i) => (
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

        <h3 className="label more-projects__title">More projects</h3>
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
    </section>
  )
}
