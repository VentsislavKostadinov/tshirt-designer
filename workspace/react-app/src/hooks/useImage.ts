import { useEffect, useState } from 'react'

export function useImage(url: string | null) {
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