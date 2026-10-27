import { useRef } from 'react'
import { Link } from '../lib/router'
import { drawVisuals, reveal, usePageMotion } from '../lib/motion'
import { pages } from '../data/site'
import Icon from './Icon'

// Shared frame for the short-URL pages: eyebrow, big title, optional side
// symbol, the page body, and a link on to the next page.
export default function PageShell({ page, intro, visual, children }) {
  const ref = useRef(null)
  const index = pages.indexOf(page)
  const next = pages[(index + 1) % pages.length]

  usePageMotion(ref, (el) => {
    reveal('.page__head > *', el, { start: 'top 100%', stagger: 0.1 })
    reveal('.page__body > :not([data-motion="custom"])', '.page__body', { stagger: 0.12 })
    reveal('.page__next', '.page__next')
    drawVisuals(el)
  }, [page.path])

  return (
    <article className={`page ${visual ? 'page--split' : 'page--wide'}`} ref={ref}>
      <header className="page__head">
        <p className="eyebrow">
          <span className="eyebrow__number">{String(index + 1).padStart(2, '0')}</span> {page.eyebrow}
        </p>
        <h1 className="page__title">{page.title}</h1>
        {intro && <p className="page__intro">{intro}</p>}
      </header>
      {visual && <div className="page__visual">{visual}</div>}
      <div className="page__body">{children}</div>
      <Link to={next.path} className="page__next">
        <span className="page__next-label">Next</span>
        <span className="page__next-title">{next.title}</span>
        <Icon name="arrow" size={28} />
      </Link>
    </article>
  )
}
