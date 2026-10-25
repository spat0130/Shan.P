import { useEffect } from 'react'
import Header from './components/Header'
import SkipLink from './components/SkipLink'
import SceneProgress from './components/SceneProgress'
import Arrival from './components/scenes/Arrival'
import Ready from './components/scenes/Ready'
import Dismount from './components/scenes/Dismount'
import Walk from './components/scenes/Walk'
import Builder from './components/scenes/Builder'
import Projects from './components/scenes/Projects'
import Connect from './components/scenes/Connect'
import { initSmoothScroll } from './lib/smoothScroll'
import { initAnimations } from './lib/animations'
import { scenes } from './data/site'

const sceneComponents = { arrival: Arrival, ready: Ready, dismount: Dismount, walk: Walk, builder: Builder, projects: Projects, connect: Connect }

export default function App() {
  useEffect(() => initSmoothScroll(), [])
  useEffect(() => initAnimations(), [])

  return (
    <>
      <SkipLink />
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <SceneProgress />
      <main>
        {scenes.map((scene) => {
          const SceneComponent = sceneComponents[scene.id]
          return <SceneComponent key={scene.id} scene={scene} />
        })}
      </main>
    </>
  )
}
