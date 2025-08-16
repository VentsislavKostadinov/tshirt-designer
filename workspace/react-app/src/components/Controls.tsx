type ControlsProps = {
  onOpenTShirtColor: () => void
  onOpenTextEditor: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRotate: () => void
  onDelete: () => void
}

export default function Controls({ onOpenTShirtColor, onOpenTextEditor, onFileChange, onRotate, onDelete }: ControlsProps) {
  return (
    <div className="btn-group col-lg-2 col-md-12" role="group" aria-label="Basic example" id="editorButtons">
      <button type="button" className="btn btn-primary" onClick={onOpenTShirtColor} data-bs-toggle="modal" data-bs-target="#colorModal">
        <i className="fas fa-palette"></i><br />
      </button>
      <button className="btn btn-primary">
        <label htmlFor="file-select" id="uploadFromPC">
          <i className="fas fa-images"></i>
        </label>
        <input type="file" id="file-select" name="file-select" className="fileSelector" accept="image/jpeg" onChange={onFileChange} />
      </button>
      <button className="btn btn-primary" id="addingText" data-bs-toggle="modal" data-bs-target="#editorTextModal" onClick={onOpenTextEditor}>
        <i className="bi bi-file-earmark-font"></i>
      </button>
      <button type="button" className="btn btn-primary" id="rotate" onClick={onRotate}>
        <i className="fas fa-sync-alt"></i><br />
      </button>
      <button type="button" className="btn btn-primary" id="delete" onClick={onDelete}>
        <i className="fas fa-trash"></i><br />
      </button>
    </div>
  )
}