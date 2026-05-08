import React from 'react'

export default function Header() {
  return (
    <header className="page-header">
      <a className="logo-mark" href="#" aria-label="Xinxing School home">
        {/* Replace /logo-placeholder.svg with /logo.png when you have the real asset */}
        <img src="./logo-placeholder.svg" alt="" />
        <span className="logo-text">
          <span className="zh">新星学校</span>
          <span className="en">XINXING SCHOOL</span>
        </span>
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
