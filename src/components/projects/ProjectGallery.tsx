'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Building2, ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  alt: string
  /** Sol üstte gösterilecek rozet (durum vb.) */
  badge?: React.ReactNode
}

export default function ProjectGallery({ images, alt, badge }: ProjectGalleryProps) {
  const photos = images.filter(Boolean)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const safeActive = Math.min(active, Math.max(0, photos.length - 1))

  const next = useCallback(
    () => setActive((i) => (photos.length ? (i + 1) % photos.length : 0)),
    [photos.length],
  )
  const prev = useCallback(
    () => setActive((i) => (photos.length ? (i - 1 + photos.length) % photos.length : 0)),
    [photos.length],
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, next, prev])

  if (photos.length === 0) {
    return (
      <div className="relative bg-gray-200 rounded-2xl h-72 sm:h-96 overflow-hidden flex flex-col items-center justify-center gap-3 text-gray-400">
        <Building2 className="w-16 h-16" />
        <span className="text-sm">Proje görseli</span>
      </div>
    )
  }

  return (
    <div>
      {/* Ana görsel */}
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full bg-gray-200 rounded-2xl h-72 sm:h-96 overflow-hidden cursor-zoom-in"
        aria-label="Görseli büyüt"
      >
        <Image
          src={photos[safeActive]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 700px"
          priority
        />
        {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/55 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <Expand className="w-3.5 h-3.5" />
          Büyüt
        </div>
        <div className="absolute bottom-3 left-3 z-10 bg-black/55 text-white text-xs px-2.5 py-1 rounded-full">
          {safeActive + 1} / {photos.length}
        </div>
      </button>

      {/* Thumbnail şeridi */}
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden border-2 transition-colors ${
                i === safeActive ? 'border-emerald-600' : 'border-transparent hover:border-gray-300'
              }`}
              aria-label={`Görsel ${i + 1}`}
            >
              <Image src={src} alt={`${alt} görsel ${i + 1}`} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-7 h-7" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[safeActive]}
              alt={`${alt} büyük görsel`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
            {safeActive + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  )
}
