import { scenes } from '../data/site'

// Side rail of scene numbers. Phase 3 highlights the active one on scroll.
export default function SceneProgress() {
  return (
    <nav className="scene-progress" aria-label="Scenes">
      <ol>
        {scenes.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-label={`${s.number} ${s.title}`}>{s.number}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
