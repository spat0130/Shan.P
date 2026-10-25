import Scene, { SceneHeading } from '../Scene'
import { profile, stats } from '../../data/site'

export default function Dismount({ scene }) {
  return (
    <Scene scene={scene} align="middle-left" shade="left">
      <SceneHeading scene={scene} />
      <p className="lead">{profile.intro}</p>
      <dl className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Scene>
  )
}
