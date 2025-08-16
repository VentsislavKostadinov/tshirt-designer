import { useRef, useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import CanvasDesigner, { type SelectableNode } from './components/CanvasDesigner'
import ColorModal from './components/ColorModal'
import TextEditorModal from './components/TextEditorModal'
import Footer from './components/Footer'

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
  const [selectedNode, setSelectedNode] = useState<SelectableNode>('text')

  const stageRef = useRef<any>(null)

  const onRotate = () => setIsBack(v => !v)

  const onChooseColor = (color: string) => {
    if (mode === 'tShirtColor') setBgColor(color)
    if (mode === 'textColor') setTextColor(color)
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      // @ts-expect-error global script included in index.html
      const res: File | Blob = await window.imageConversion.compress(file, 0.2)
      const url = URL.createObjectURL(res)
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

  return (
    <div className="container-fluid">
      <Header />

      <div className="row">
        <Controls
          onOpenTShirtColor={() => setMode('tShirtColor')}
          onOpenTextEditor={() => setMode('textColor')}
          onFileChange={onFileChange}
          onRotate={onRotate}
          onDelete={clearCanvas}
        />

        <CanvasDesigner
          isBack={isBack}
          bgColor={bgColor}
          text={text}
          textColor={textColor}
          fontStyle={fontStyle}
          fontFamily={fontFamily}
          fontSize={fontSize}
          uploadedUrl={uploadedUrl}
          selectedNode={selectedNode}
          onSelectedNodeChange={setSelectedNode}
          stageRef={stageRef}
        />

        <Footer onAddToCart={() => {
          const dataURL = stageRef.current?.toDataURL?.()
          void dataURL
        }} />
      </div>

      <ColorModal onChooseColor={onChooseColor} />
      <TextEditorModal
        text={text}
        setText={(val) => {
          setText(val)
          setFontSize(val.length > 16 ? 16 : 22)
        }}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        onChooseColor={onChooseColor}
      />

      <div className="spinner-grow" role="status" style={{ display: 'none' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default App
