import Scene, { SceneHeading } from '../Scene'
import { profile, skills } from '../../data/site'

export default function Builder({ scene }) {
  return (
    <Scene scene={scene} align="middle-right" shade="right" className="builder">
      <SceneHeading scene={scene} />
      {profile.bio.map((para, i) => (
        <p key={i} className={i === 0 ? 'lead' : undefined}>{para}</p>
      ))}
      <h3 className="label">Toolkit</h3>
      <ul className="chips">
        {skills.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </Scene>
  )
}
