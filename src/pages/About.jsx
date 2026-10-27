import PageShell from '../components/PageShell'
import Icon from '../components/Icon'
import { BuilderVisual } from '../components/Visuals'
import { pages, principles, profile, skills } from '../data/site'

export default function About() {
  return (
    <PageShell page={pages[0]} intro={profile.bio[0]} visual={<BuilderVisual />}>
      <p>{profile.bio[1]}</p>

      <section aria-labelledby="how-i-work">
        <h2 id="how-i-work" className="label">How I work</h2>
        <ul className="principles">
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
      </section>

      <section aria-labelledby="toolkit">
        <h2 id="toolkit" className="label">Toolkit</h2>
        <ul className="chips">
          {skills.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <figure className="quote">
        <blockquote>“{profile.quote.text}”</blockquote>
        <figcaption>
          <strong>{profile.quote.author}</strong> · {profile.quote.role}
        </figcaption>
      </figure>
    </PageShell>
  )
}
