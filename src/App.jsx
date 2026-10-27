import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header'
import SkipLink from './components/SkipLink'
import Loader from './components/Loader'
import { shouldPlayIntro } from './lib/intro'
import ParticleField from './components/ParticleField'
import Home from './pages/Home'
import About from './pages/About'
import Journey from './pages/Journey'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { RouterProvider, useRouter } from './lib/router'
import { gsap, initSmoothScroll, reducedMotion, ScrollTrigger, scrollToTop } from './lib/smoothScroll'
import { pages, profile } from './data/site'

const routes = { '/': Home, '/about': About, '/journey': Journey, '/projects': Projects, '/contact': Contact }

function Shell() {
  const { path } = useRouter()
  const [intro, setIntro] = useState(shouldPlayIntro)
  const [shown, setShown] = useState(path)
  const curtain = useRef(null)
  const endIntro = useCallback(() => setIntro(false), [])

  useEffect(() => initSmoothScroll(), [])

  // Page change: a sunset curtain sweeps up, the page swaps underneath, and
  // the curtain carries on off the top of the screen.
  useLayoutEffect(() => {
    if (path === shown) return
    if (reducedMotion()) {
      setShown(path)
      scrollToTop()
      return
    }
    const tl = gsap.timeline()
    tl.fromTo(curtain.current, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' })
      .add(() => {
        setShown(path)
        scrollToTop()
      })
      .to(curtain.current, { yPercent: -100, duration: 0.6, ease: 'power3.out', delay: 0.05 })
    return () => tl.kill()
  }, [path, shown])

  useEffect(() => {
    const page = pages.find((p) => p.path === shown)
    document.title = page ? `${page.label} · ${profile.name}` : profile.name
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [shown])

  const Page = routes[shown] || NotFound

  return (
    <>
      {intro && <Loader onDone={endIntro} />}
      <ParticleField />
      <SkipLink />
      <Header />
      <main id="main">
        <Page key={shown} ready={!intro} />
      </main>
      <div className="curtain" ref={curtain} aria-hidden="true" />
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}
