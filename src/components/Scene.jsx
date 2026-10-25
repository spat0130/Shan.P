// A full-screen storyboard frame: background image, shading, and a content
// slot. `align` places the content; Phase 3 adds the scroll animation.
export default function Scene({ scene, align = 'bottom-left', shade = 'bottom', className = '', priority = false, children }) {
  return (
    <section id={scene.id} className={`scene scene--${align} ${className}`} aria-labelledby={`${scene.id}-title`}>
      <div className="scene__media">
        <img
          className="scene__bg"
          src={scene.image}
          srcSet={`${scene.image.replace('.webp', '-960.webp')} 960w, ${scene.image} 1920w`}
          sizes="100vw"
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
        />
        <div className={`scene__shade scene__shade--${shade}`} />
      </div>
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
