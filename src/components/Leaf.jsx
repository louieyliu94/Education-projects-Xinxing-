import React from 'react'

// Watercolor wash palettes — modeled on the reference image: muted, layered,
// transparent. Each leaf stacks 3 washes for depth, then a darker ink vein.
//
// We lean GREEN-DOMINANT to match the reference; blue/yellow/red appear as
// occasional accents rather than equal-weighted colors.
const PALETTES = {
  green1: { wash1: '#9bbf7e', wash2: '#6e9a52', wash3: '#3f6b2a', vein: '#2a4a1c' },
  green2: { wash1: '#b8d199', wash2: '#88a85e', wash3: '#52732e', vein: '#33501c' },
  green3: { wash1: '#7fae8e', wash2: '#508870', wash3: '#2c5d4a', vein: '#1a3e30' },
  yellow: { wash1: '#f0d97e', wash2: '#d9b14a', wash3: '#a37d20', vein: '#6b4d10' },
  blue:   { wash1: '#9fbedc', wash2: '#5d86b4', wash3: '#2c5587', vein: '#1a3858' },
  red:    { wash1: '#e8a08c', wash2: '#c87060', wash3: '#9a3826', vein: '#5e1f12' }
}

// A single leaf — pointed oval (kapok / Chinese ink style).
//
// Positioning uses a nested <svg x=... y=...>. This is bulletproof: CSS
// transform animations on descendants cannot move the leaf away from (x, y)
// because x/y are SVG layout attributes, not transforms.
export default function Leaf({
  project,
  x,
  y,
  rotate = 0,
  scale = 1,
  swayDelay = 0,
  swayDuration = 5,
  onClick
}) {
  const palette = PALETTES[project.color] || PALETTES.green1
  // Inner viewport is 100x60 centered on (50, 30); leaf coords below assume that.
  return (
    <svg x={x - 50} y={y - 30} width="100" height="60" overflow="visible" className="leaf-host">
      <g
        className="leaf"
        style={{
          animationDelay: `${swayDelay}s`,
          animationDuration: `${swayDuration}s`
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        aria-label={`Open portfolio: ${project.studentNameEn}, ${project.projectTitleEn}`}
      >
        <g transform={`translate(50 30) rotate(${rotate}) scale(${scale})`}>
          {/* Three watercolor washes, semi-transparent so they bleed and overlap.
              Filter pushes the edges around for that wet-edge look. */}
          <path
            d="M -34 0 C -28 -10, 8 -14, 30 -4 C 36 -2, 36 2, 30 4 C 8 14, -28 10, -34 0 Z"
            fill={palette.wash1}
            opacity="0.45"
            filter="url(#watercolor-strong)"
          />
          <path
            d="M -28 0 C -22 -8, 6 -11, 24 -3 C 28 -1, 28 1, 24 3 C 6 11, -22 8, -28 0 Z"
            fill={palette.wash2}
            opacity="0.55"
            filter="url(#watercolor)"
          />
          <path
            d="M -22 0 C -18 -6, 4 -8, 18 -2 C 21 -0.5, 21 0.5, 18 2 C 4 8, -18 6, -22 0 Z"
            fill={palette.wash3}
            opacity="0.55"
            filter="url(#watercolor)"
          />

          {/* Sketchy ink vein down the center — broken stroke for hand-drawn feel */}
          <path
            d="M -28 0 L 24 0"
            stroke={palette.vein}
            strokeOpacity="0.7"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="14 1.5 7 1.5 12"
            fill="none"
          />
          {/* Side veins */}
          <path
            d="M -10 0 L -4 -5 M 4 0 L 10 -5 M -10 0 L -4 5 M 4 0 L 10 5"
            stroke={palette.vein}
            strokeOpacity="0.4"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Stem connecting back to the twig */}
          <path
            d="M -28 0 L -38 1"
            stroke="#3a2418"
            strokeOpacity="0.65"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tiny star — Xinxing's signature, very subtle now */}
          <g transform="translate(0 0) scale(0.4)" opacity="0.55">
            <path
              d="M 0 -5 L 1.4 -1.5 L 5 -1.5 L 2 0.7 L 3.2 4 L 0 2 L -3.2 4 L -2 0.7 L -5 -1.5 L -1.4 -1.5 Z"
              fill="#FFFEF6"
            />
          </g>
        </g>

        {/* Hover label */}
        <g className="leaf-label" pointerEvents="none" transform="translate(50 30)">
          <rect x="-72" y="22" width="144" height="34" rx="6" fill="#FFFEF6" stroke="#1B2A6B" strokeOpacity="0.25" />
          <text x="0" y="36" textAnchor="middle" fontSize="10" fill="#1B2A6B" fontWeight="600">
            {project.studentNameZh} · {project.studentNameEn}
          </text>
          <text x="0" y="49" textAnchor="middle" fontSize="9" fill="#3a2418" fontStyle="italic">
            {project.projectTitleEn}
          </text>
        </g>
      </g>
    </svg>
  )
}
