import Scene from '../Scene'
import Icon from '../Icon'
import { contact, profile } from '../../data/site'

const YEAR = new Date().getFullYear()

export default function Connect({ scene }) {
  return (
    <Scene scene={scene} align="middle-right" shade="right" className="connect">
      <p className="eyebrow"><span className="eyebrow__number">{scene.number}</span> Final stop</p>
      <h2 id={`${scene.id}-title`} className="scene__title">{contact.heading}</h2>
      <p className="lead">{contact.text}</p>
      <ul className="connect__links">
        {contact.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <Icon name={l.icon} size={28} />
              <span>{l.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="connect__footer">© {YEAR} {profile.name} · {profile.location}</p>
    </Scene>
  )
}
