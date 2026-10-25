import Scene, { SceneHeading } from '../Scene'
import { timeline } from '../../data/site'

export default function Walk({ scene }) {
  return (
    <Scene scene={scene} align="bottom-left" shade="bottom-strong" className="walk">
      <SceneHeading scene={scene} />
      <ol className="timeline">
        {timeline.map((m) => (
          <li key={m.id} className="glass">
            <p className="timeline__period">{m.period}</p>
            <h3>{m.title}</h3>
            <p className="timeline__place">{m.place}</p>
            <p>{m.text}</p>
          </li>
        ))}
      </ol>
    </Scene>
  )
}
