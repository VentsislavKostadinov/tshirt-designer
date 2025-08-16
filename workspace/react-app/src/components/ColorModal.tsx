import { COLORS } from '../constants/colors'

function hideModalById(id: string) {
  const el = document.getElementById(id)
  const modal = (window as any)?.bootstrap?.Modal?.getOrCreateInstance?.(el)
  modal?.hide?.()
}

type ColorModalProps = {
  onChooseColor: (color: string) => void
}

export default function ColorModal({ onChooseColor }: ColorModalProps) {
  return (
    <div className="modal fade" id="colorModal" tabIndex={-1} aria-labelledby="colorModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="colorModalLabel">Choose a color</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" id="colorDrawer">
            <ul className="list-group">
              {COLORS.map(c => (
                <li key={c} className="list-group-item color-preview" title={c} style={{ backgroundColor: c }} onClick={() => { onChooseColor(c); hideModalById('colorModal') }}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}