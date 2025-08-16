import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Text as KonvaText, Image as KonvaImage, Transformer } from 'react-konva'
import { useImage } from '../hooks/useImage'

const MAX_WIDTH = 150

export type SelectableNode = 'text' | 'image' | null

type CanvasDesignerProps = {
  isBack: boolean
  bgColor: string
  text: string
  textColor: string
  fontStyle: 'normal' | 'bold' | 'italic'
  fontFamily: string
  fontSize: number
  uploadedUrl: string | null
  selectedNode: SelectableNode
  onSelectedNodeChange: (node: SelectableNode) => void
  stageRef: React.RefObject<any>
}

export default function CanvasDesigner({ isBack, bgColor, text, textColor, fontStyle, fontFamily, fontSize, uploadedUrl, selectedNode, onSelectedNodeChange, stageRef }: CanvasDesignerProps) {
  const uploadedImage = useImage(uploadedUrl)

  const layerRef = useRef<any>(null)
  const textRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const trTextRef = useRef<any>(null)
  const trImageRef = useRef<any>(null)

  const frontSrc = '/img/crew_front.png'
  const backSrc = '/img/crew_back.png'

  const [textPos, setTextPos] = useState({ x: 5, y: 20, width: 140 })
  const [imagePos, setImagePos] = useState({ x: 10, y: 10, width: 140, height: 90 })

  useEffect(() => {
    if (!uploadedImage) return
    // size presets similar to vanilla after image loads
    if (uploadedImage.width > uploadedImage.height) setImagePos(prev => ({ ...prev, width: 140, height: 90 }))
    else if (uploadedImage.width < uploadedImage.height) setImagePos(prev => ({ ...prev, width: 90, height: 140 }))
    else setImagePos(prev => ({ ...prev, width: 100, height: 100 }))
  }, [uploadedImage])

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

  const onTextTransform = (e: any) => {
    const node = e.target
    const newWidth = Math.min(node.width() * node.scaleX(), MAX_WIDTH)
    setTextPos(prev => ({ ...prev, width: newWidth }))
    node.scaleX(1)
  }

  return (
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
              onClick={() => onSelectedNodeChange('text')}
              onTap={() => onSelectedNodeChange('text')}
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
                onClick={() => onSelectedNodeChange('image')}
                onTap={() => onSelectedNodeChange('image')}
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
  )
}