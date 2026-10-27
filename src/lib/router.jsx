import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// A tiny history-API router. Paths are written without the deploy base
// ('/about'), so the same links work locally and on GitHub Pages.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const RouterContext = createContext({ path: '/', navigate: () => {} })

function currentPath() {
  const path = window.location.pathname.slice(BASE.length).replace(/\/$/, '')
  return path || '/'
}

export const href = (path) => `${BASE}${path === '/' ? '/' : path}`

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    if (to === currentPath()) return
    window.history.pushState({}, '', href(to))
    setPath(to)
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

// Internal link: plain <a> for crawlers and new tabs, client-side navigation on click.
export function Link({ to, children, ...props }) {
  const { navigate } = useRouter()
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={href(to)} onClick={onClick} {...props}>{children}</a>
}
