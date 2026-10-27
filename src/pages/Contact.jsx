import PageShell from '../components/PageShell'
import EmailLink from '../components/EmailLink'
import Icon from '../components/Icon'
import { ConnectVisual } from '../components/Visuals'
import { contact, pages, profile } from '../data/site'
import { emailAddress } from '../lib/email'

export default function Contact() {
  return (
    <PageShell page={pages[3]} intro={contact.text} visual={<ConnectVisual />}>
      <ul className="contact-links">
        {contact.links.map((l) => (
          <li key={l.label}>
            <ContactLink href={l.href}>
              <Icon name={l.icon} size={26} />
              <span className="contact-links__label">{l.label}</span>
              <span className="contact-links__value">
                {l.href === 'email' ? emailAddress() : l.href.replace(/^https:\/\/(www\.)?/, '')}
              </span>
              <Icon name="arrow" size={20} />
            </ContactLink>
          </li>
        ))}
      </ul>
      <p className="contact-note">Based in {profile.location}. Happy to chat about business analysis, product and consulting roles.</p>
    </PageShell>
  )
}

function ContactLink({ href, children }) {
  if (href === 'email') return <EmailLink>{children}</EmailLink>
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>
}
