import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Main from './pages/Main'
import CanvasEditor from './pages/CanvasEditor'
import { useCanvasLibrary } from './hooks/useCanvasLibrary'

function App() {
  const { canvases, createCanvas, updateCanvas } = useCanvasLibrary()
  const [activeCanvasId, setActiveCanvasId] = useState<string | null>(null)

  const activeCanvas = useMemo(
    () => canvases.find(item => item.id === activeCanvasId) ?? null,
    [canvases, activeCanvasId],
  )

  useEffect(() => {
    if (activeCanvasId && !activeCanvas) {
      setActiveCanvasId(null)
    }
  }, [activeCanvasId, activeCanvas])

  const handleCreate = () => {
    const created = createCanvas()
    setActiveCanvasId(created.id)
  }

  if (activeCanvas) {
    return (
      <CanvasEditor
        canvas={activeCanvas}
        onBack={() => setActiveCanvasId(null)}
        onNameChange={name => {
          updateCanvas(activeCanvas.id, { name })
        }}
      />
    )
  }

  return <Main canvases={canvases} onCreate={handleCreate} onSelect={setActiveCanvasId} />
}

export default App
