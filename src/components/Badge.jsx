import { useId } from 'react'
import { Link } from '../lib/router'
import EmailLink from './EmailLink'
import Icon from './Icon'

// A round link with its label set on a circle, like a stamp. Internal paths
// use the router, 'email' opens the mail app, and http links open in a new tab.
export default function Badge({ to, label, icon, className = '' }) {
  const id = useId().replace(/:/g, '')
  const text = `${label} • `.repeat(label.length > 14 ? 1 : 2)
  const content = (
    <>
      <svg className="badge__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={`ring-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href={`#ring-${id}`} startOffset="0">{text}</textPath>
        </text>
      </svg>
      <span className="badge__icon"><Icon name={icon} size={44} /></span>
      <span className="visually-hidden">{label}</span>
    </>
  )
  const cls = `badge ${className}`
  if (to === 'email') return <EmailLink className={cls}>{content}</EmailLink>
  if (/^https?:/.test(to)) {
    return <a className={cls} href={to} target="_blank" rel="noreferrer">{content}</a>
  }
  return <Link className={cls} to={to}>{content}</Link>
}
