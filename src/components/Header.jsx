import { useEffect, useRef, useState } from 'react'
import EmailLink from './EmailLink'
import Icon from './Icon'
import { Link, useRouter } from '../lib/router'
import { setScrollLocked } from '../lib/smoothScroll'
import { contact, pages, profile } from '../data/site'
import photo from '../assets/shan.webp'

// Desktop shows the nav inline. On phones the nav and the home page badges
// fold into one full-screen menu behind the hamburger.
export default function Header() {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)
  const menu = useRef(null)
  const toggle = useRef(null)

  // Close whenever the page changes (a menu link was used).
  const [menuPath, setMenuPath] = useState(path)
  if (menuPath !== path) {
    setMenuPath(path)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    setScrollLocked(true)
    menu.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggle.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      setScrollLocked(false)
    }
  }, [open])

  const links = (
    <ul className="site-nav">
      {pages.map((p) => (
        <li key={p.path}>
          <Link to={p.path} aria-current={path === p.path ? 'page' : undefined}>{p.label}</Link>
        </li>
      ))}
    </ul>
  )

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <Link to="/" className="site-header__logo" aria-label={`${profile.name}, home`}>
        <img className="site-header__mark" src={photo} alt="" width="40" height="40" />
        <span className="site-header__name">{profile.shortName}</span>
      </Link>
      <nav className="site-header__nav" aria-label="Main">{links}</nav>

      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        <span className="menu-toggle__bar" aria-hidden="true" />
        <span className="menu-toggle__bar" aria-hidden="true" />
      </button>

      <div id="mobile-menu" ref={menu} className="mobile-menu" hidden={!open}>
        <nav aria-label="Menu">
          <ol className="mobile-menu__pages">
            <li style={{ '--i': 0 }}>
              <Link to="/" aria-current={path === '/' ? 'page' : undefined}><small>00</small>Home</Link>
            </li>
            {pages.map((p, i) => (
              <li key={p.path} style={{ '--i': i + 1 }}>
                <Link to={p.path} aria-current={path === p.path ? 'page' : undefined}>
                  <small>{String(i + 1).padStart(2, '0')}</small>{p.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <ul className="mobile-menu__social">
          {contact.links.map((l) => (
            <li key={l.label}>
              {l.href === 'email'
                ? <EmailLink><Icon name={l.icon} size={20} />{l.label}</EmailLink>
                : <a href={l.href} target="_blank" rel="noreferrer"><Icon name={l.icon} size={20} />{l.label}</a>}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
