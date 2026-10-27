import { useEffect, useState } from 'react'
import { applyTheme, followSystem } from '../lib/theme'

// Sun and moon share one button: the sun's rays fold away and a crescent
// slides over it when switching to dark.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const next = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => followSystem(setTheme), [])

  const toggle = () => {
    applyTheme(next, true)
    setTheme(next)
  }

  return (
    <button type="button" className={`theme-toggle is-${theme}`} onClick={toggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <mask id="theme-moon">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-toggle__bite" cx="17" cy="7" r="5.5" fill="#000" />
        </mask>
        <circle className="theme-toggle__disc" cx="12" cy="12" r="5" fill="currentColor" mask="url(#theme-moon)" />
        <g className="theme-toggle__rays">
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      </svg>
    </button>
  )
}
