import { useState } from 'react'

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// A card that turns over to show its details. Mouse users flip it by hovering,
// touch users by tapping, keyboard users by tabbing to the flip button.
// With reduced motion the faces cross-fade instead of turning.
export default function FlipCard({ className = '', label, front, back }) {
  const [flipped, setFlipped] = useState(false)

  const onClick = (e) => {
    // Hover already flips on mouse devices; let links on the back work as links.
    if (canHover() || e.target.closest('a, button')) return
    setFlipped((f) => !f)
  }

  return (
    <li className={`flip-card ${className} ${flipped ? 'is-flipped' : ''}`} onClick={onClick}>
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__front">{front}</div>
        <div className="flip-card__face flip-card__back">{back}</div>
      </div>
      <button
        type="button"
        className="flip-card__toggle"
        aria-expanded={flipped}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="visually-hidden">{flipped ? `Hide details for ${label}` : `Show details for ${label}`}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" /><path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" /><path d="M3 21v-5h5" />
        </svg>
      </button>
    </li>
  )
}
