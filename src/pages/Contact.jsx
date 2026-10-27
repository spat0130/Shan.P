import PageShell from '../components/PageShell'
import Icon from '../components/Icon'
import { ConnectVisual } from '../components/Visuals'
import { contact, pages, profile } from '../data/site'

export default function Contact() {
  return (
    <PageShell page={pages[3]} intro={contact.text} visual={<ConnectVisual />}>
      <ul className="contact-links">
        {contact.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <Icon name={l.icon} size={26} />
              <span className="contact-links__label">{l.label}</span>
              <span className="contact-links__value">{l.href.replace(/^(mailto:|https:\/\/(www\.)?)/, '')}</span>
              <Icon name="arrow" size={20} />
            </a>
          </li>
        ))}
      </ul>
      <p className="contact-note">Based in {profile.location}. Happy to chat about business analysis, product and consulting roles.</p>
    </PageShell>
  )
}
