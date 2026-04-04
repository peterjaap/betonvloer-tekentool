import {
  ShapeUtil,
  Geometry2d,
  Rectangle2d,
  HTMLContainer,
  T,
} from 'tldraw'

const SCALE = 100 // pixels per meter
const PAD = 40 // padding for labels

export class FloorPlanShapeUtil extends ShapeUtil<any> {
  static override type = 'floor-plan' as const

  static override props = {
    w: T.number,
    h: T.number,
  }

  getDefaultProps() {
    return {
      w: 14 * SCALE + PAD * 2,
      h: 4 * SCALE + PAD * 2,
    }
  }

  override canEdit() { return false }
  override canResize() { return false }
  override canBind() { return false }
  override isAspectRatioLocked() { return true }
  override hideSelectionBoundsFg() { return true }

  getGeometry(shape: any): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: any) {
    const totalW = shape.props.w
    const totalH = shape.props.h
    const floorW = totalW - PAD * 2
    const floorH = totalH - PAD * 2
    const metersW = floorW / SCALE
    const metersH = floorH / SCALE

    const gridLines: any[] = []

    // Vertical lines (every meter)
    for (let i = 0; i <= metersW; i++) {
      const x = PAD + i * SCALE
      const isMajor = i % 5 === 0
      gridLines.push(
        <line
          key={`v-${i}`}
          x1={x} y1={PAD} x2={x} y2={PAD + floorH}
          stroke={isMajor ? '#94a3b8' : '#cbd5e1'}
          strokeWidth={isMajor ? 1.5 : 0.5}
          strokeDasharray={isMajor ? undefined : '4 4'}
        />
      )
      // Meter labels on top
      if (i > 0 && i < metersW) {
        gridLines.push(
          <text
            key={`vt-${i}`}
            x={x} y={PAD - 6}
            textAnchor="middle"
            fontSize={11}
            fill="#64748b"
            fontFamily="system-ui"
          >
            {i}m
          </text>
        )
      }
    }

    // Horizontal lines (every meter)
    for (let i = 0; i <= metersH; i++) {
      const y = PAD + i * SCALE
      const isMajor = i % 5 === 0
      gridLines.push(
        <line
          key={`h-${i}`}
          x1={PAD} y1={y} x2={PAD + floorW} y2={y}
          stroke={isMajor ? '#94a3b8' : '#cbd5e1'}
          strokeWidth={isMajor ? 1.5 : 0.5}
          strokeDasharray={isMajor ? undefined : '4 4'}
        />
      )
      if (i > 0 && i < metersH) {
        gridLines.push(
          <text
            key={`ht-${i}`}
            x={PAD - 6} y={y + 4}
            textAnchor="end"
            fontSize={11}
            fill="#64748b"
            fontFamily="system-ui"
          >
            {i}m
          </text>
        )
      }
    }

    // 10cm sub-grid
    for (let i = 0; i <= metersW * 10; i++) {
      if (i % 10 === 0) continue
      const x = PAD + i * (SCALE / 10)
      gridLines.push(
        <line
          key={`vs-${i}`}
          x1={x} y1={PAD} x2={x} y2={PAD + floorH}
          stroke="#e2e8f0"
          strokeWidth={0.25}
        />
      )
    }
    for (let i = 0; i <= metersH * 10; i++) {
      if (i % 10 === 0) continue
      const y = PAD + i * (SCALE / 10)
      gridLines.push(
        <line
          key={`hs-${i}`}
          x1={PAD} y1={y} x2={PAD + floorW} y2={y}
          stroke="#e2e8f0"
          strokeWidth={0.25}
        />
      )
    }

    return (
      <HTMLContainer
        style={{
          width: totalW,
          height: totalH,
          pointerEvents: 'all',
        }}
      >
        <svg
          width={totalW}
          height={totalH}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Outer background */}
          <rect width={totalW} height={totalH} fill="transparent" />

          {/* Floor plan background */}
          <rect
            x={PAD} y={PAD}
            width={floorW} height={floorH}
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth={3}
            rx={2}
          />

          {/* Grid */}
          {gridLines}

          {/* Dimension label bottom */}
          <text
            x={PAD + floorW / 2} y={totalH - 6}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="#334155"
            fontFamily="system-ui"
          >
            ← {metersW} meter →
          </text>

          {/* Dimension label right */}
          <text
            x={totalW - 6} y={PAD + floorH / 2}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="#334155"
            fontFamily="system-ui"
            transform={`rotate(90, ${totalW - 6}, ${PAD + floorH / 2})`}
          >
            ← {metersH} meter →
          </text>

          {/* Title */}
          <text
            x={PAD + floorW / 2} y={PAD - 16}
            textAnchor="middle"
            fontSize={16}
            fontWeight={700}
            fill="#1e293b"
            fontFamily="system-ui"
          >
            Betonvloer Tuinhuis — {metersW} × {metersH}m
          </text>
        </svg>
      </HTMLContainer>
    )
  }

  indicator(shape: any) {
    return <rect width={shape.props.w} height={shape.props.h} rx={2} />
  }
}
