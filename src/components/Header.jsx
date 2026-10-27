import { Link, useRouter } from '../lib/router'
import { pages, profile } from '../data/site'

export default function Header() {
  const { path } = useRouter()
  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo" aria-label={`${profile.name}, home`}>
        <span className="site-header__mark" aria-hidden="true">SP</span>
        <span className="site-header__name">{profile.shortName}</span>
      </Link>
      <nav aria-label="Main">
        <ul className="site-nav">
          {pages.map((p) => (
            <li key={p.path}>
              <Link to={p.path} aria-current={path === p.path ? 'page' : undefined}>{p.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
