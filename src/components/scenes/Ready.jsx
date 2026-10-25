import Scene, { SceneHeading } from '../Scene'
import { ReadyVisual } from '../Visuals'
import { principles } from '../../data/site'

export default function Ready({ scene }) {
  return (
    <Scene scene={scene} align="bottom-right" visual={<ReadyVisual />}>
      <SceneHeading scene={scene} />
      <ul className="principles">
        {principles.map((p) => (
          <li key={p.label}>
            <h3>{p.label}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </Scene>
  )
}
