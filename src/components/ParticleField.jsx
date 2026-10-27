import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/smoothScroll'

const CREAM = '244,239,233'
const COLORS = ['255,138,61', '255,197,107', CREAM]

// A fixed canvas of tiny drifting triangles, like embers over the city at dusk.
// They lean away from the pointer a little, and freeze for reduced motion.
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const still = reducedMotion()
    let w = 0
    let h = 0
    let particles = []
    let frame = 0
    const pointer = { x: 0.5, y: 0.5 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(160, Math.round((w * h) / 9000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1.5 + Math.random() * 3.5,
        depth: 0.2 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.01,
        vy: -(0.05 + Math.random() * 0.25),
        vx: (Math.random() - 0.5) * 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.15 + Math.random() * 0.45,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const light = document.documentElement.dataset.theme === 'light'
      const px = (pointer.x - 0.5) * 30
      const py = (pointer.y - 0.5) * 30
      for (const p of particles) {
        if (!still) {
          p.x += p.vx
          p.y += p.vy * p.depth
          p.angle += p.spin
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
        }
        const x = p.x - px * p.depth
        const y = p.y - py * p.depth
        const s = p.size * p.depth + 1
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(p.angle)
        ctx.beginPath()
        ctx.moveTo(0, -s)
        ctx.lineTo(s * 0.87, s * 0.5)
        ctx.lineTo(-s * 0.87, s * 0.5)
        ctx.closePath()
        // On the light theme the cream particles would vanish, so draw them dark.
        const color = light && p.color === CREAM ? '60,48,40' : p.color
        ctx.fillStyle = `rgba(${color},${p.alpha * p.depth})`
        ctx.fill()
        ctx.restore()
      }
      if (!still) frame = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      pointer.x = e.clientX / w
      pointer.y = e.clientY / h
    }
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) draw()
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
