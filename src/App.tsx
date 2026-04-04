import { Tldraw, Editor, createShapeId } from 'tldraw'
import 'tldraw/tldraw.css'
import { FloorPlanShapeUtil } from './shapes/FloorPlanShape'
import { PlumbingShapeUtil } from './shapes/PlumbingShape'
import { Sidebar } from './components/Sidebar'
import { COMPONENT_TYPES } from './components/componentTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const customShapeUtils = [FloorPlanShapeUtil, PlumbingShapeUtil]

const SCALE = 100

export default function App() {
  const editorRef = useRef<Editor | null>(null)
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const showLabelsRef = useRef(showLabels)
  showLabelsRef.current = showLabels

  const placeComponent = useCallback((componentId: string, screenX: number, screenY: number) => {
    const editor = editorRef.current
    if (!editor) return

    const compDef = COMPONENT_TYPES.find(c => c.id === componentId)
    if (!compDef) return

    const point = editor.screenToPage({ x: screenX, y: screenY })

    editor.createShape({
      type: 'plumbing',
      x: point.x - compDef.size / 2,
      y: point.y - compDef.size / 2,
      props: {
        componentType: compDef.id,
        w: compDef.size,
        h: compDef.size,
        label: compDef.label,
        showLabel: showLabelsRef.current,
      },
    })
  }, [])

  // Register native drag/drop listeners on the canvas wrapper in capture phase
  // so they fire before tldraw can intercept them
  useEffect(() => {
    const el = canvasWrapperRef.current
    if (!el) return

    const handleDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes('application/tekentool-component')) {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
      }
    }

    const handleDrop = (e: DragEvent) => {
      const componentType = e.dataTransfer?.getData('application/tekentool-component')
      if (!componentType) return

      e.preventDefault()
      e.stopPropagation()

      placeComponent(componentType, e.clientX, e.clientY)
    }

    el.addEventListener('dragover', handleDragOver, true)
    el.addEventListener('drop', handleDrop, true)

    return () => {
      el.removeEventListener('dragover', handleDragOver, true)
      el.removeEventListener('drop', handleDrop, true)
    }
  }, [placeComponent])

  const handleMount = useCallback((editor: Editor) => {
    editorRef.current = editor

    // Only create the floor plan if it doesn't already exist (i.e. not restored from persistence)
    const existingFloor = editor.getCurrentPageShapes().find(s => s.type === 'floor-plan')
    if (!existingFloor) {
      const floorId = createShapeId('floor')
      editor.createShape({
        id: floorId,
        type: 'floor-plan',
        x: 0,
        y: 0,
        isLocked: true,
        props: {
          w: 14 * SCALE + 80,
          h: 4 * SCALE + 80,
        },
      })
    }

    setTimeout(() => {
      editor.zoomToFit({ animation: { duration: 300 } })
    }, 100)
  }, [])

  const handleSidebarClick = useCallback((componentId: string) => {
    const editor = editorRef.current
    if (!editor) return

    // Place in the center of the current viewport
    const viewportBounds = editor.getViewportPageBounds()
    const centerX = viewportBounds.x + viewportBounds.w / 2
    const centerY = viewportBounds.y + viewportBounds.h / 2

    const compDef = COMPONENT_TYPES.find(c => c.id === componentId)
    if (!compDef) return

    editor.createShape({
      type: 'plumbing',
      x: centerX - compDef.size / 2,
      y: centerY - compDef.size / 2,
      props: {
        componentType: compDef.id,
        w: compDef.size,
        h: compDef.size,
        label: compDef.label,
        showLabel: showLabels,
      },
    })
  }, [showLabels])

  const handleExport = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const snapshot = editor.store.getStoreSnapshot()
    const data = JSON.stringify(snapshot, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `betonvloer-plattegrond-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const handleImport = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const text = await file.text()
      const snapshot = JSON.parse(text)
      editor.store.loadStoreSnapshot(snapshot)
    }
    input.click()
  }, [])

  const toggleLabels = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    const newVal = !showLabels
    setShowLabels(newVal)
    const shapes = editor.getCurrentPageShapes().filter(s => s.type === 'plumbing')
    for (const shape of shapes) {
      editor.updateShape({
        id: shape.id,
        type: 'plumbing',
        props: { ...(shape.props as Record<string, unknown>), showLabel: newVal },
      })
    }
  }, [showLabels])

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar
        showLabels={showLabels}
        onToggleLabels={toggleLabels}
        onItemClick={handleSidebarClick}
        onExport={handleExport}
        onImport={handleImport}
      />
      <div
        ref={canvasWrapperRef}
        style={{ flex: 1, position: 'relative' }}
      >
        <Tldraw
          shapeUtils={customShapeUtils}
          onMount={handleMount}
          persistenceKey="tekentool-betonvloer"
        />
      </div>
    </div>
  )
}
