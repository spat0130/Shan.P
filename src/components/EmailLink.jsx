import { emailAddress } from '../lib/email'
import { href } from '../lib/router'

// Becomes a mailto: link only on click, so the address isn't in the page for
// bots to collect. Without JS the link falls back to the contact page.

export default function EmailLink({ children, ...props }) {
  const onClick = (e) => {
    e.preventDefault()
    window.location.href = `mailto:${emailAddress()}`
  }
  return <a href={href('/contact')} onClick={onClick} {...props}>{children}</a>
}
