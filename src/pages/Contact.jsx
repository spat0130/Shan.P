import { useRef } from 'react'
import PageShell from '../components/PageShell'
import EmailLink from '../components/EmailLink'
import Icon from '../components/Icon'
import { gsap } from '../lib/smoothScroll'
import { usePageMotion } from '../lib/motion'
import { contact, pages, profile } from '../data/site'
import photoLarge from '../assets/contact-1600.webp'
import photoSmall from '../assets/contact-900.webp'

export default function Contact() {
  const photo = useRef(null)

  // The photo opens out from the centre like a widening horizon, then drifts
  // slightly as the page scrolls.
  usePageMotion(photo, (el) => {
    gsap.fromTo(el, { clipPath: 'inset(0% 50% 0% 50% round 18px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 18px)',
      duration: 1.4,
      ease: 'power3.inOut',
      delay: 0.3,
    })
    gsap.fromTo(el.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 2, ease: 'power3.out', delay: 0.3 })
    gsap.to(el.querySelector('img'), {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <PageShell page={pages[3]} intro={contact.text}>
      <figure className="contact-photo" ref={photo} data-motion="custom">
        <img
          src={photoLarge}
          srcSet={`${photoSmall} 900w, ${photoLarge} 1600w`}
          sizes="(max-width: 1240px) 100vw, 1200px"
          width="1600"
          height="586"
          alt="Shan standing beside a motorbike above the Yarra River, with the Melbourne skyline at sunset"
          loading="eager"
        />
      </figure>
      <ul className="contact-links">
        {contact.links.map((l) => (
          <li key={l.label}>
            <ContactLink href={l.href}>
              <Icon name={l.icon} size={26} />
              <span className="contact-links__label">{l.label}</span>
              <span className="contact-links__value">
                {l.href === 'email' ? 'Send me a message' : l.href.replace(/^https:\/\/(www\.)?/, '')}
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
