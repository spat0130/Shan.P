import PageShell from '../components/PageShell'
import { WalkVisual } from '../components/Visuals'
import { pages, profile, stats, timeline } from '../data/site'

export default function Journey() {
  return (
    <PageShell page={pages[1]} intro={profile.intro}>
      <dl className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      <WalkVisual />
      <ol className="timeline">
        {timeline.map((m) => (
          <li key={m.id} className="glass">
            <p className="timeline__period">{m.period}</p>
            <h3>{m.title}</h3>
            <p className="timeline__place">{m.place}</p>
            <p>{m.text}</p>
          </li>
        ))}
      </ol>
    </PageShell>
  )
}
