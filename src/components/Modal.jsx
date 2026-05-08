import React, { useEffect, useRef } from 'react'

export default function Modal({ project, onClose }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeBtnRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close portfolio"
        >
          ✕
        </button>

        <header className="modal-header">
          <div className="modal-meta">
            <span className="modal-grade">{project.grade}</span>
            <span className="modal-year">{project.year}</span>
          </div>
          <h2 id="modal-title" className="modal-title">
            <span className="zh">{project.projectTitleZh}</span>
            <span className="en">{project.projectTitleEn}</span>
          </h2>
          <p className="modal-student">
            {project.studentNameZh} · <em>{project.studentNameEn}</em>
          </p>
        </header>

        <div className="modal-body">
          {project.blocks.map((block, i) => {
            if (block.type === 'image') {
              return (
                <figure key={i} className="modal-figure">
                  <img src={block.src} alt={block.caption || ''} loading="lazy" />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              )
            }
            return (
              <p key={i} className="modal-text">
                {block.content}
              </p>
            )
          })}
        </div>

        <footer className="modal-footer">
          <span className="modal-slogan">发现 每个孩子身上的星光</span>
          <span className="modal-school">Xinxing School · 新星学校</span>
        </footer>
      </div>
    </div>
  )
}
