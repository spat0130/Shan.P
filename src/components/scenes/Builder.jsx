import Scene, { SceneHeading } from '../Scene'
import { BuilderVisual } from '../Visuals'
import { profile, skills } from '../../data/site'

export default function Builder({ scene }) {
  return (
    <Scene scene={scene} align="middle-right" className="builder" visual={<BuilderVisual />}>
      <SceneHeading scene={scene} />
      {profile.bio.map((para, i) => (
        <p key={i} className={i === 0 ? 'lead' : undefined}>{para}</p>
      ))}
      <h3 className="label">Toolkit</h3>
      <ul className="chips">
        {skills.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <figure className="quote">
        <blockquote>“{profile.quote.text}”</blockquote>
        <figcaption>
          <strong>{profile.quote.author}</strong> · {profile.quote.role}
        </figcaption>
      </figure>
    </Scene>
  )
}
