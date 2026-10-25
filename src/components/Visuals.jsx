// Line-art symbols that stand in for photography, one per scene. Every stroke
// with the `draw` class has pathLength=1 so animations.js can draw it in by
// tweening stroke-dashoffset from 1 to 0.

const D = { pathLength: 1, className: 'draw' }

function Svg({ name, viewBox = '0 0 600 600', preserveAspectRatio, children }) {
  return (
    <svg className={`visual visual--${name}`} viewBox={viewBox} preserveAspectRatio={preserveAspectRatio} fill="none" aria-hidden="true">
      {children}
    </svg>
  )
}

// 01: a target of concentric rings with the monogram at its centre.
export function ArrivalVisual() {
  return (
    <Svg name="arrival">
      <g className="rings">
        {[60, 110, 160, 210, 260].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} {...D} />
        ))}
      </g>
      <line x1="300" y1="10" x2="300" y2="590" {...D} className="draw faint" />
      <line x1="10" y1="300" x2="590" y2="300" {...D} className="draw faint" />
      <g className="orbit">
        <circle cx="300" cy="90" r="5" className="dot" />
      </g>
      <g className="orbit orbit--slow">
        <circle cx="510" cy="300" r="4" className="dot dot--gold" />
      </g>
      <text x="300" y="318" textAnchor="middle" className="monogram">SP</text>
    </Svg>
  )
}

// 02: three chevrons on a track, one per principle.
export function ReadyVisual() {
  return (
    <Svg name="ready" viewBox="0 0 600 300">
      <line x1="20" y1="150" x2="580" y2="150" {...D} className="draw faint" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${110 + i * 160} 70 L${190 + i * 160} 150 L${110 + i * 160} 230`} {...D} className="draw chevron" />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={150 + i * 160} cy="150" r="6" className="node" />
      ))}
    </Svg>
  )
}

// 03: engineer to analyst. Code brackets on the left become a bar chart on the right.
export function DismountVisual() {
  const bars = [120, 190, 150, 250, 210]
  return (
    <Svg name="dismount" viewBox="0 0 700 400">
      <g className="code">
        <path d="M110 120 L40 200 L110 280" {...D} />
        <path d="M200 120 L270 200 L200 280" {...D} />
        <path d="M175 95 L135 305" {...D} />
      </g>
      <path d="M300 200 L390 200 M370 180 L390 200 L370 220" {...D} className="draw arrow" />
      <g className="bars">
        {bars.map((h, i) => (
          <rect key={i} x={430 + i * 50} y={330 - h} width="30" height={h} rx="3" {...D} />
        ))}
        <line x1="415" y1="330" x2="680" y2="330" {...D} className="draw faint" />
      </g>
    </Svg>
  )
}

// 04: the route, a winding path through six milestones.
export function WalkVisual() {
  const points = [
    [70, 236], [250, 110], [440, 200], [630, 90], [820, 180], [1010, 80],
  ]
  return (
    <Svg name="walk" viewBox="0 0 1080 300">
      <path
        d="M20 240 C 120 240, 160 110, 250 110 S 360 200, 440 200 S 540 90, 630 90 S 740 180, 820 180 S 940 80, 1060 60"
        {...D}
        className="draw route"
      />
      {points.map(([x, y], i) => (
        <g key={i} className="stop">
          <circle cx={x} cy={y} r="14" {...D} />
          <circle cx={x} cy={y} r="4" className="node" />
        </g>
      ))}
    </Svg>
  )
}

// 05: a network of connected skills, centred on one hub.
export function BuilderVisual() {
  const hub = [300, 300]
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 ? 230 : 160
    return [300 + Math.cos(a) * r, 300 + Math.sin(a) * r]
  })
  return (
    <Svg name="builder">
      <polygon points="300,90 482,195 482,405 300,510 118,405 118,195" {...D} className="draw faint" />
      <g className="links">
        {nodes.map(([x, y], i) => (
          <line key={`h${i}`} x1={hub[0]} y1={hub[1]} x2={x} y2={y} {...D} />
        ))}
        {nodes.map(([x, y], i) => {
          const [nx, ny] = nodes[(i + 1) % nodes.length]
          return <line key={`r${i}`} x1={x} y1={y} x2={nx} y2={ny} {...D} className="draw faint" />
        })}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 6 : 9} className="node" />
      ))}
      <circle cx="300" cy="300" r="22" {...D} />
      <circle cx="300" cy="300" r="8" className="node node--hub" />
    </Svg>
  )
}

// 06: a perspective grid floor under the project cards.
export function ProjectsVisual() {
  const verticals = Array.from({ length: 17 }, (_, i) => i)
  const horizontals = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <Svg name="projects" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
      {verticals.map((i) => (
        <line key={`v${i}`} x1={600 + (i - 8) * 30} y1="0" x2={600 + (i - 8) * 260} y2="400" {...D} />
      ))}
      {horizontals.map((i) => {
        const y = 400 * Math.pow(i / 7, 1.8)
        return <line key={`h${i}`} x1="0" y1={y} x2="1200" y2={y} {...D} />
      })}
    </Svg>
  )
}

// 07: lines reaching out from one point to many. Connection.
export function ConnectVisual() {
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return [300 + Math.cos(a) * 240, 300 + Math.sin(a) * 240]
  })
  return (
    <Svg name="connect">
      <circle cx="300" cy="300" r="240" {...D} className="draw faint" />
      <circle cx="300" cy="300" r="130" {...D} className="draw faint" />
      <g className="spokes">
        {spokes.map(([x, y], i) => (
          <line key={i} x1="300" y1="300" x2={x} y2={y} {...D} />
        ))}
      </g>
      {spokes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="node" />
      ))}
      <circle cx="300" cy="300" r="12" className="node node--hub" />
    </Svg>
  )
}
