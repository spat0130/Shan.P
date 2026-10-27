import { reducedMotion } from './smoothScroll'

const SEEN_KEY = 'sp-intro-seen'

// The loading intro plays once per browser session, never for reduced motion.
export function shouldPlayIntro() {
  if (reducedMotion()) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Storage can be blocked (private mode); the intro just plays again.
  }
}
