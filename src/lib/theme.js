// Light/dark theme. The choice is saved per browser; with no saved choice the
// site follows the system setting.
const KEY = 'sp-theme'

function saved() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function initialTheme() {
  const theme = saved()
  if (theme === 'light' || theme === 'dark') return theme
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f2ea' : '#0b0f14')
  if (!persist) return
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // Private mode or blocked storage: the toggle still works for this visit.
  }
}

// Until the visitor picks a theme, keep matching the system if it changes.
export function followSystem(onChange) {
  const query = window.matchMedia('(prefers-color-scheme: light)')
  const update = () => {
    if (saved()) return
    const theme = query.matches ? 'light' : 'dark'
    applyTheme(theme)
    onChange?.(theme)
  }
  query.addEventListener('change', update)
  return () => query.removeEventListener('change', update)
}
