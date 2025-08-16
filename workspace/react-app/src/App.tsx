import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Text as KonvaText, Image as KonvaImage, Transformer } from 'react-konva'

const COLORS = [
  '#ffffff', '#616161', '#f0f0f0', '#5b5b5b', '#222222', '#fc8d74', '#432d26', '#eead91', '#806355', '#382d21',
  '#faef93', '#aeba5e', '#8aa140', '#1f6522', '#13afa2', '#b8d5d7', '#15aeda', '#a5def8', '#0f77c0', '#3469b7',
  '#c50404'
]

const MAX_WIDTH = 150

function useImage(url: string | null) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    if (!url) {
      setImage(null)
      return
    }
    const img = new Image()
    img.onload = () => setImage(img)
    img.src = url
    return () => {
      setImage(null)
    }
  }, [url])
  return image
}

function App() {
  const [isBack, setIsBack] = useState(false)
  const [bgColor, setBgColor] = useState<string>('transparent')
  const [mode, setMode] = useState<'tShirtColor' | 'textColor' | ''>('')

  const [text, setText] = useState<string>('Type your text')
  const [textColor, setTextColor] = useState<string>('#000000')
  const [fontStyle, setFontStyle] = useState<'normal' | 'bold' | 'italic'>('normal')
  const [fontFamily, setFontFamily] = useState<string>('Montserrat')
  const [fontSize, setFontSize] = useState<number>(22)

  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const uploadedImage = useImage(uploadedUrl)

  const [selectedNode, setSelectedNode] = useState<'text' | 'image' | null>('text')

  const stageRef = useRef<any>(null)
  const layerRef = useRef<any>(null)
  const textRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const trTextRef = useRef<any>(null)
  const trImageRef = useRef<any>(null)

  const frontSrc = '/img/crew_front.png'
  const backSrc = '/img/crew_back.png'

  const [textPos, setTextPos] = useState({ x: 5, y: 20, width: 140 })
  const [imagePos, setImagePos] = useState({ x: 10, y: 10, width: 140, height: 90 })

  const onRotate = () => setIsBack(v => !v)

  const onChooseColor = (color: string) => {
    if (mode === 'tShirtColor') {
      setBgColor(color)
    }
    if (mode === 'textColor') {
      setTextColor(color)
    }
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      // @ts-expect-error global script included in index.html
      const res: File | Blob = await window.imageConversion.compress(file, 0.2)
      const url = URL.createObjectURL(res)
      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.src = url
      })
      let width = 100, height = 100
      if (img.width > img.height) { width = 140; height = 90 }
      else if (img.width < img.height) { width = 90; height = 140 }
      setImagePos(prev => ({ ...prev, width, height }))
      setUploadedUrl(url)
      setSelectedNode('image')
    } catch (err) {
      console.error(err)
    }
  }

  const clearCanvas = () => {
    setUploadedUrl(null)
    setSelectedNode('text')
  }

  const onTextTransform = (e: any) => {
    const node = e.target
    const newWidth = Math.min(node.width() * node.scaleX(), MAX_WIDTH)
    setTextPos(prev => ({ ...prev, width: newWidth }))
    node.scaleX(1)
  }

  useEffect(() => {
    if (selectedNode === 'text' && trTextRef.current && textRef.current) {
      trTextRef.current.nodes([textRef.current])
      trTextRef.current.getLayer()?.batchDraw()
    }
    if (selectedNode === 'image' && trImageRef.current && imageRef.current) {
      trImageRef.current.nodes([imageRef.current])
      trImageRef.current.getLayer()?.batchDraw()
    }
  }, [selectedNode])

  return (
    <div className="container-fluid">
      <header className="header">
        <div className="headerBox logo" style={{ cursor: 'pointer' }}>
          <span className="clickLogo"><b>Logo</b></span>
        </div>
        <div className="headerBox exit" style={{ cursor: 'pointer' }}>
          <div className="exitText"><b>Exit</b></div>
          <div className="exitImage"><span className="exitCross"></span></div>
        </div>
      </header>

      <div className="row">
        <div className="btn-group col-lg-2 col-md-12" role="group" aria-label="Basic example" id="editorButtons">
          <button type="button" className="btn btn-primary" onClick={() => setMode('tShirtColor')} data-bs-toggle="modal" data-bs-target="#colorModal">
            <i className="fas fa-palette"></i><br />
          </button>
          <button className="btn btn-primary">
            <label htmlFor="file-select" id="uploadFromPC">
              <i className="fas fa-images"></i>
            </label>
            <input type="file" id="file-select" name="file-select" className="fileSelector" accept="image/jpeg" onChange={onFileChange} />
          </button>
          <button className="btn btn-primary" id="addingText" data-bs-toggle="modal" data-bs-target="#editorTextModal" onClick={() => setMode('textColor')}>
            <i className="bi bi-file-earmark-font"></i>
          </button>
          <button type="button" className="btn btn-primary" id="rotate" onClick={onRotate}>
            <i className="fas fa-sync-alt"></i><br />
          </button>
          <button type="button" className="btn btn-primary" id="delete" onClick={clearCanvas}>
            <i className="fas fa-trash"></i><br />
          </button>
        </div>

        <section id="editorImage" className="col-lg-8 col-md-6 col-sm-6" style={{ backgroundColor: bgColor }}>
          <img className="img-fluid frontImage" src={frontSrc} alt="" style={{ display: isBack ? 'none' : 'block' }} />
          <div id="preview" style={{ display: isBack ? 'none' : 'block' }}>
            <Stage ref={stageRef} width={158} height={258}>
              <Layer ref={layerRef}>
                <KonvaText
                  ref={textRef}
                  x={5}
                  y={20}
                  width={textPos.width}
                  fontSize={fontSize}
                  align="center"
                  text={text}
                  draggable
                  fill={textColor}
                  fontStyle={fontStyle}
                  fontFamily={fontFamily}
                  onClick={() => setSelectedNode('text')}
                  onTap={() => setSelectedNode('text')}
                  onDragStart={() => {
                    const el = document.querySelector('.konvajs-content') as HTMLElement
                    if (el) el.style.border = '1px solid black'
                  }}
                  onDragEnd={() => {
                    const el = document.querySelector('.konvajs-content') as HTMLElement
                    if (el) el.style.border = 'none'
                  }}
                  onTransform={onTextTransform}
                />
                {selectedNode === 'text' && (
                  <Transformer
                    ref={trTextRef}
                    rotateEnabled={false}
                    enabledAnchors={["top-left","top-right","bottom-left","bottom-right"]}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (Math.abs(newBox.width) > MAX_WIDTH) return oldBox
                      return newBox
                    }}
                  />
                )}

                {uploadedImage && (
                  <KonvaImage
                    ref={imageRef}
                    image={uploadedImage}
                    x={imagePos.x}
                    y={imagePos.y}
                    width={imagePos.width}
                    height={imagePos.height}
                    draggable
                    dragBoundFunc={(pos) => {
                      const stageWidth = 158
                      const stageHeight = 258
                      const w = imageRef.current?.width() ?? 0
                      const h = imageRef.current?.height() ?? 0
                      const newX = pos.x < 0 ? 0 : pos.x > stageWidth - w ? stageWidth - w : pos.x
                      const newY = pos.y < 0 ? 0 : pos.y > stageHeight - h ? stageHeight - h : pos.y
                      return { x: newX, y: newY }
                    }}
                    onClick={() => setSelectedNode('image')}
                    onTap={() => setSelectedNode('image')}
                    onDragStart={() => {
                      const el = document.querySelector('.konvajs-content') as HTMLElement
                      if (el) el.style.border = '1px solid black'
                    }}
                    onDragEnd={() => {
                      const el = document.querySelector('.konvajs-content') as HTMLElement
                      if (el) el.style.border = 'none'
                    }}
                  />
                )}
                {uploadedImage && selectedNode === 'image' && (
                  <Transformer
                    ref={trImageRef}
                    rotateEnabled={false}
                    keepRatio
                    enabledAnchors={["top-left","top-right","bottom-left","bottom-right"]}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (Math.abs(newBox.width) > MAX_WIDTH) return oldBox
                      return newBox
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>
          <img className="img-fluid backImage" src={backSrc} alt="" style={{ display: isBack ? 'block' : 'none' }} />
        </section>

        <footer className="col-lg-2 col-md-12">
          <button type="button" className="btn btn-info footerBut" id="tshirt-add-to-cart" onClick={() => {
            const dataURL = stageRef.current?.toDataURL?.()
            void dataURL
          }}>
            Add to basket
          </button>
        </footer>
      </div>

      {/* COLOR PICKER MODAL */}
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
                  <li key={c} className="list-group-item color-preview" title={c} style={{ backgroundColor: c }} onClick={() => onChooseColor(c)}></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EDITOR TEXT MODAL */}
      <div className="modal fade" id="editorTextModal" tabIndex={-1} aria-labelledby="editorTextLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="editorTextLabel">Editor Text</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" id="editorTextDrawer">
              <div className="text-center">
                <button type="button" className="btn btn-primary" id="drawText" data-bs-dismiss="modal" onClick={() => setSelectedNode('text')}>
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
                        <li key={c} className="list-group-item color-preview" title={c} style={{ backgroundColor: c }} onClick={() => onChooseColor(c)}></li>
                      ))}
                    </ul>
                  </div>
                  <br />
                  <div className="mb-3">
                    <input className="form-control" value={text} onChange={(e) => {
                      const val = e.target.value
                      setText(val)
                      setFontSize(val.length > 16 ? 16 : 22)
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

      <div className="spinner-grow" role="status" style={{ display: 'none' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default App
