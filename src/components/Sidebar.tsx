import { COMPONENT_TYPES, CATEGORIES } from './componentTypes'

interface SidebarProps {
  showLabels: boolean
  onToggleLabels: () => void
  onItemClick: (componentId: string) => void
  onExport: () => void
  onImport: () => void
}

export function Sidebar({ showLabels, onToggleLabels, onItemClick, onExport, onImport }: SidebarProps) {
  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData('application/tekentool-component', componentId)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="sidebar">
      <h2>Tekentool Betonvloer</h2>
      <div className="sidebar-instructions">
        <strong>Klik</strong> op een component om het in het midden te plaatsen,
        of <strong>sleep</strong> het naar de gewenste plek op het canvas.
        Gebruik de tldraw tools (lijn, pijl) om leidingen te tekenen.
        Canvas = 12 × 3 meter.
      </div>

      {CATEGORIES.map(cat => {
        const items = COMPONENT_TYPES.filter(c => c.category === cat.id)
        return (
          <div key={cat.id} className="sidebar-section">
            <h3 style={{ color: cat.color }}>{cat.label}</h3>
            {items.map(comp => (
              <div
                key={comp.id}
                className="sidebar-item"
                draggable
                onDragStart={e => handleDragStart(e, comp.id)}
                onClick={() => onItemClick(comp.id)}
              >
                <div
                  className="sidebar-icon"
                  style={{ background: cat.color + '22', border: `2px solid ${cat.color}44` }}
                >
                  {comp.icon}
                </div>
                <div className="sidebar-label">
                  <span>{comp.label}</span>
                  <span>{comp.description}</span>
                </div>
              </div>
            ))}
          </div>
        )
      })}

      <div className="sidebar-footer">
        <button className="toggle-btn" onClick={onToggleLabels}>
          Labels: {showLabels ? 'Aan' : 'Uit'}
        </button>
        <button className="toggle-btn" onClick={onExport}>
          Opslaan als bestand
        </button>
        <button className="toggle-btn" onClick={onImport}>
          Bestand laden
        </button>
      </div>
    </div>
  )
}
