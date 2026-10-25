import Scene from '../Scene'
import { ArrivalVisual } from '../Visuals'
import { profile } from '../../data/site'

export default function Arrival({ scene }) {
  return (
    <Scene scene={scene} align="bottom-left" className="arrival" visual={<ArrivalVisual />}>
      <p className="eyebrow"><span className="eyebrow__number">{scene.number}</span> {scene.caption}</p>
      <h1 id={`${scene.id}-title`} className="arrival__name">
        <span>{profile.firstName}</span>
        <span>{profile.lastName}</span>
      </h1>
      <p className="arrival__role">{profile.role}</p>
      <p className="arrival__location">{profile.location}</p>
      <a href="#ready" className="scroll-cue">Scroll to ride along</a>
    </Scene>
  )
}
