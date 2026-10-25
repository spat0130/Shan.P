import { SceneHeading } from '../Scene'
import Icon from '../Icon'
import { focusAreas, projects } from '../../data/site'

// Not a full-bleed frame: the storyboard image becomes a dim backdrop behind
// a grid of glowing "holographic" project cards.
export default function Projects({ scene }) {
  return (
    <section id={scene.id} className="projects" aria-labelledby={`${scene.id}-title`}>
      <img className="projects__bg" src={scene.image} alt="" loading="lazy" decoding="async" />
      <div className="projects__inner">
        <SceneHeading scene={scene} />
        <ul className="focus-areas" aria-label="Focus areas">
          {focusAreas.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <ul className="project-grid">
          {projects.map((p) => (
            <li key={p.id} className="project-card">
              <div className="project-card__thumb" aria-hidden="true">{p.title.slice(-2)}</div>
              <p className="project-card__category">{p.category}</p>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <ul className="project-card__tags">
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <a href={p.link} className="project-card__link" aria-label={`View ${p.title}`}>
                View project <Icon name="arrow" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
