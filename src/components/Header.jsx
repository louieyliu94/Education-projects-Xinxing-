import React, { useState } from 'react'

// The school logo is a specific seal-style mark with concentric squares —
// it should be used as-is, not redrawn or abstracted. Drop the real file at:
//   public/logo.png   (or .svg / .jpg)
//
// If the file doesn't exist, we fall back to text-only branding rather than
// showing a placeholder mark that misrepresents the school's identity.
export default function Header() {
  const [logoOk, setLogoOk] = useState(true)
  return (
    <header className="page-header">
      <a className="logo-mark" href="#" aria-label="Xinxing School home">
        {logoOk && (
          <img
            src="./logo.svg"
            alt="Xinxing School logo"
            onError={() => setLogoOk(false)}
          />
        )}
        {!logoOk && (
          <span className="logo-text">
            <span className="zh">新星学校</span>
            <span className="en">XINXING SCHOOL</span>
          </span>
        )}
      </a>

      <div className="page-title-block">
        <h1 className="page-title">
          <span className="zh">新星学生庆典</span>
          <span className="en">Xinxing Student Celebrations</span>
        </h1>
        <p className="page-slogan">发现 每个孩子身上的星光</p>
      </div>
    </header>
  )
}
