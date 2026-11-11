import Icon from './Icon'

// Any image in src/assets/projects named after a project's id becomes its photo,
// e.g. drone-thermal.webp. Projects without one get a placeholder.
const files = import.meta.glob('../assets/projects/*.{webp,jpg,jpeg,png,avif}', { eager: true, import: 'default' })
const photos = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url]),
)

export const hasPhoto = (id) => Boolean(photos[id])

export default function ProjectPhoto({ project, index, icon = 'chart', className = '' }) {
  const src = photos[project.id]
  if (src) {
    return (
      <div className={`project-photo ${className}`}>
        <img src={src} alt={project.imageAlt ?? ''} loading="lazy" decoding="async" />
      </div>
    )
  }
  return (
    <div className={`project-photo project-photo--placeholder ${className}`} aria-hidden="true">
      <Icon name={icon} size={36} />
      {index != null && <span className="project-photo__index">{String(index + 1).padStart(2, '0')}</span>}
    </div>
  )
}
