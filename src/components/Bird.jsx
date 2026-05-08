import React from 'react'

// Folk-art bird, inspired by the red bird in the reference image and by the
// brushwork of the Xinxing logo. Flat color, ink outline, simple wing.
//
// kind:
//   "perched"  — sits on a branch, bobs gently
//   "flying"   — drifts across the canopy with flapping wings
export default function Bird({ x = 0, y = 0, scale = 1, kind = 'perched', delay = 0, duration = 14, color = '#C8412B' }) {
  const className = kind === 'flying' ? 'bird bird-flying' : 'bird bird-perched'
  return (
    <svg
      x={x - 22}
      y={y - 18}
      width="44"
      height="36"
      overflow="visible"
      className={className}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <g transform={`translate(22 18) scale(${scale})`}>
        {/* Body */}
        <path
          d="M -14 2 C -16 -2, -10 -8, -2 -8 C 8 -8, 16 -4, 18 0 C 16 4, 8 6, 0 6 C -8 6, -13 5, -14 2 Z"
          fill={color}
          opacity="0.85"
          filter="url(#watercolor)"
        />
        {/* Tail */}
        <path
          d="M -14 2 L -22 -2 L -22 6 Z"
          fill={color}
          opacity="0.85"
          filter="url(#watercolor)"
        />
        {/* Beak */}
        <path d="M 18 0 L 24 -1 L 18 2 Z" fill="#f4d77a" />
        {/* Eye */}
        <circle cx="13" cy="-3" r="1.2" fill="#1a0e08" />
        {/* Wing — flap animation */}
        <g className="bird-wing">
          <path
            d="M -2 -4 C 4 -10, 12 -10, 14 -2 C 8 -2, 2 -1, -2 -2 Z"
            fill="#1a0e08"
            opacity="0.85"
            filter="url(#watercolor)"
          />
        </g>
        {/* Legs (only show on perched birds) */}
        {kind === 'perched' && (
          <g stroke="#2a1810" strokeWidth="0.9" strokeLinecap="round" fill="none">
            <path d="M -2 6 L -3 12" />
            <path d="M 4 6 L 5 12" />
          </g>
        )}
      </g>
    </svg>
  )
}
