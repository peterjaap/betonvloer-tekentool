import {
  ShapeUtil,
  Geometry2d,
  Rectangle2d,
  HTMLContainer,
  T,
  resizeBox,
} from 'tldraw'
import { COMPONENT_TYPES } from '../components/componentTypes'

export class PlumbingShapeUtil extends ShapeUtil<any> {
  static override type = 'plumbing' as const

  static override props = {
    componentType: T.string,
    w: T.number,
    h: T.number,
    label: T.string,
    showLabel: T.boolean,
  }

  getDefaultProps() {
    return {
      componentType: 'riool-put',
      w: 40,
      h: 40,
      label: 'Rioolput',
      showLabel: true,
    }
  }

  override canEdit() { return false }
  override canResize() { return true }
  override canSnap() { return true }

  override onResize(shape: any, info: any) {
    return resizeBox(shape, info)
  }

  getGeometry(shape: any): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: any) {
    const { w, h, componentType, label, showLabel } = shape.props
    const compDef = COMPONENT_TYPES.find((c: any) => c.id === componentType)
    const color = compDef?.color ?? '#666'
    const icon = compDef?.icon ?? '?'

    return (
      <HTMLContainer
        style={{
          width: w,
          height: h,
          overflow: 'visible',
          pointerEvents: 'all',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: w,
            height: h,
            borderRadius: '50%',
            background: color + '33',
            border: `2.5px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: Math.min(w, h) * 0.5,
            lineHeight: 1,
            boxShadow: `0 2px 8px ${color}44`,
          }}
        >
          {icon}
        </div>
        {showLabel && (
          <div
            style={{
              position: 'absolute',
              top: h + 2,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: 10,
              fontWeight: 600,
              fontFamily: 'system-ui',
              color: '#1e293b',
              background: 'rgba(255,255,255,0.9)',
              padding: '1px 4px',
              borderRadius: 3,
              border: `1px solid ${color}66`,
              pointerEvents: 'none',
            }}
          >
            {label}
          </div>
        )}
      </HTMLContainer>
    )
  }

  indicator(shape: any) {
    return (
      <ellipse
        cx={shape.props.w / 2}
        cy={shape.props.h / 2}
        rx={shape.props.w / 2}
        ry={shape.props.h / 2}
      />
    )
  }
}
