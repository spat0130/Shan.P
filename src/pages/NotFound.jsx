import { Link } from '../lib/router'

export default function NotFound() {
  return (
    <article className="page page--wide not-found">
      <header className="page__head">
        <p className="eyebrow">404</p>
        <h1 className="page__title">Wrong turn</h1>
        <p className="page__intro">This street doesn't go anywhere yet.</p>
        <Link to="/" className="button">Back home</Link>
      </header>
    </article>
  )
}
