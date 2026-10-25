// A full-screen storyboard frame: a line-art symbol on one side and a content
// slot on the other. `align` places the content; the visual takes the opposite side.
export default function Scene({ scene, align = 'bottom-left', visual, className = '', children }) {
  return (
    <section id={scene.id} className={`scene scene--${align} ${className}`} aria-labelledby={`${scene.id}-title`}>
      <div className="scene__media">{visual}</div>
      <div className="scene__content">{children}</div>
    </section>
  )
}

export function SceneHeading({ scene, as: Tag = 'h2' }) {
  return (
    <>
      <p className="eyebrow">
        <span className="eyebrow__number">{scene.number}</span> {scene.caption}
      </p>
      <Tag id={`${scene.id}-title`} className="scene__title">{scene.title}</Tag>
    </>
  )
}
