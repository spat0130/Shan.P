import { Link, useRouter } from '../lib/router'
import { pages, profile } from '../data/site'
import photo from '../assets/shan.webp'

export default function Header() {
  const { path } = useRouter()
  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo" aria-label={`${profile.name}, home`}>
        <img className="site-header__mark" src={photo} alt="" width="40" height="40" />
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
