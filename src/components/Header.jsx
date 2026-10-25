import { profile, scenes } from '../data/site'

const navItems = scenes.filter((s) => ['builder', 'projects', 'connect'].includes(s.id))

export default function Header() {
  return (
    <header className="site-header">
      <a href="#arrival" className="site-header__name">{profile.shortName}</a>
      <nav aria-label="Main">
        <ul className="site-nav">
          {navItems.map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.title.replace("Let's ", '').replace('Meet the ', '').replace(' in Motion', '')}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
