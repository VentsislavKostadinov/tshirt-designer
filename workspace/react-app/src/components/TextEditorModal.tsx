import { COLORS } from '../constants/colors'

type TextEditorModalProps = {
  text: string
  setText: (val: string) => void
  fontStyle: 'normal' | 'bold' | 'italic'
  setFontStyle: (s: 'normal' | 'bold' | 'italic') => void
  fontFamily: string
  setFontFamily: (s: string) => void
  onChooseColor: (color: string) => void
}

function hideModalById(id: string) {
  const el = document.getElementById(id)
  const modal = (window as any)?.bootstrap?.Modal?.getOrCreateInstance?.(el)
  modal?.hide?.()
}

export default function TextEditorModal({ text, setText, fontStyle, setFontStyle, fontFamily, setFontFamily, onChooseColor }: TextEditorModalProps) {
  return (
    <div className="modal fade" id="editorTextModal" tabIndex={-1} aria-labelledby="editorTextLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center" id="editorTextLabel">Editor Text</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" id="editorTextDrawer">
            <div className="text-center">
              <button type="button" className="btn btn-primary" id="drawText" data-bs-dismiss="modal">
                <i className="fas fa-plus"> Add Text</i>
              </button>
              <div id="fontColorPickerWrap">
                <br />
                <br />
                <h2>Choose a color</h2>
                <br />
                <div id="fontColorPicker">
                  <ul className="list-group">
                    {COLORS.map(c => (
                      <li key={c} className="list-group-item color-preview" title={c} style={{ backgroundColor: c }} onClick={() => { onChooseColor(c); hideModalById('editorTextModal') }}></li>
                    ))}
                  </ul>
                </div>
                <br />
                <div className="mb-3">
                  <input className="form-control" value={text} onChange={(e) => {
                    const val = e.target.value
                    setText(val)
                  }} placeholder="Type your text" />
                </div>
                <div id="fontStyle">
                  <h2>Font style</h2>
                  <select className="form-select" id="chooseFontStyle" aria-label="Default select example" value={fontStyle} onChange={e => setFontStyle(e.target.value as any)}>
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>
                <div id="fontFamily">
                  <h2>Font Family</h2>
                  <select className="form-select" id="chooseFontFamily" aria-label="Default select example" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Sans Serif">Sans Serif</option>
                    <option value="Arial">Arial</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Arial Black">Arial Black</option>
                    <option value="Impact">Impact</option>
                    <option value="Bookman">Bookman</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Palatino">Palatino</option>
                    <option value="Georgia">Georgia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}