import React from 'react'

// Watercolor wash palettes — soft, layered, transparent.
// School colors (indigo and red) appear as accent leaves; greens dominate.
const PALETTES = {
  green1: { wash1: '#9bbf7e', wash2: '#6e9a52', wash3: '#3f6b2a', vein: '#2a4a1c' },
  green2: { wash1: '#b8d199', wash2: '#88a85e', wash3: '#52732e', vein: '#33501c' },
  green3: { wash1: '#7fae8e', wash2: '#508870', wash3: '#2c5d4a', vein: '#1a3e30' },
  yellow: { wash1: '#f0d97e', wash2: '#d9b14a', wash3: '#a37d20', vein: '#6b4d10' },
  blue:   { wash1: '#5a78b0', wash2: '#2e4683', wash3: '#1B2A6B', vein: '#0E1742' },
  red:    { wash1: '#dd9888', wash2: '#c8412B', wash3: '#9a3826', vein: '#5e1f12' }
}

// Three leaf shape variants — each is a slightly different irregular outline,
// so leaves don't all look stamped from the same mold. Variant is picked by id.
const SHAPES = [
  // pointed-oval, leaning right
  {
    outer: 'M -34 1 C -28 -11, 4 -15, 28 -5 C 35 -2, 35 3, 28 5 C 4 14, -28 10, -34 1 Z',
    mid:   'M -27 0 C -21 -8, 4 -11, 22 -3 C 26 -1, 26 1, 22 3 C 4 11, -21 8, -27 0 Z',
    core:  'M -20 0 C -16 -6, 3 -8, 16 -2 C 19 -0.5, 19 0.5, 16 2 C 3 8, -16 6, -20 0 Z'
  },
  // longer, narrower, tip drooping
  {
    outer: 'M -36 -1 C -25 -10, 5 -10, 30 -2 C 36 0, 35 4, 28 6 C 0 12, -25 8, -36 -1 Z',
    mid:   'M -28 -1 C -19 -7, 4 -8, 23 -1 C 27 1, 26 3, 22 4 C 0 9, -19 6, -28 -1 Z',
    core:  'M -22 0 C -15 -5, 4 -6, 17 -1 C 20 0, 19 2, 16 3 C 0 7, -15 4, -22 0 Z'
  },
  // rounder, fuller — like a younger leaf
  {
    outer: 'M -32 2 C -28 -12, 0 -16, 24 -8 C 34 -4, 36 4, 28 8 C 4 16, -28 12, -32 2 Z',
    mid:   'M -25 1 C -22 -10, 0 -12, 19 -5 C 27 -2, 28 3, 22 6 C 2 12, -22 9, -25 1 Z',
    core:  'M -19 0 C -17 -8, 0 -9, 14 -3 C 20 -1, 21 2, 17 4 C 1 9, -17 6, -19 0 Z'
  }
]

function variantFor(id) {
  // Stable hash so the same leaf always uses the same shape.
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return SHAPES[h % SHAPES.length]
}

// A single leaf. Position via nested <svg x=... y=...> — bulletproof against
// CSS transforms on descendants.
export default function Leaf({
  project,
  x,
  y,
  rotate = 0,
  scale = 1,
  swayDelay = 0,
  swayDuration = 5,
  onClick,
  onDisturb
}) {
  const palette = PALETTES[project.color] || PALETTES.green1
  const shape = variantFor(project.id)

  const handleEnter = () => onDisturb && onDisturb()
  const handleClick = () => {
    onDisturb && onDisturb()
    onClick()
  }

  return (
    <svg x={x - 50} y={y - 30} width="100" height="60" overflow="visible" className="leaf-host">
      <g
        className="leaf"
        style={{
          animationDelay: `${swayDelay}s`,
          animationDuration: `${swayDuration}s`
        }}
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onFocus={handleEnter}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-label={`Open portfolio: ${project.studentNameEn}, ${project.projectTitleEn}`}
      >
        <g transform={`translate(50 30) rotate(${rotate}) scale(${scale})`}>
          {/* Wet underwash — softest layer, large bleed */}
          <path d={shape.outer} fill={palette.wash1} opacity="0.32" filter="url(#watercolor-strong)" />
          {/* Middle wash */}
          <path d={shape.mid} fill={palette.wash2} opacity="0.45" filter="url(#watercolor)" />
          {/* Core wash — most pigment */}
          <path d={shape.core} fill={palette.wash3} opacity="0.55" filter="url(#watercolor)" />

          {/* A second offset core stroke — gives the layered, brushy feel of
              wet-on-wet ink rather than a single flat shape */}
          <path
            d={shape.core}
            transform="translate(2 -1) scale(0.92)"
            fill={palette.vein}
            opacity="0.18"
            filter="url(#watercolor)"
          />

          {/* Sketchy main vein — broken dashes feel more drawn than drawn-with-ruler */}
          <path
            d="M -28 0 L 24 0"
            stroke={palette.vein}
            strokeOpacity="0.55"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeDasharray="11 2 6 1.5 9"
            fill="none"
          />
          {/* Side veins, very faint */}
          <path
            d="M -10 0 L -4 -5 M 4 0 L 10 -5 M -10 0 L -4 5 M 4 0 L 10 5"
            stroke={palette.vein}
            strokeOpacity="0.28"
            strokeWidth="0.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* No leaf-stem path: the twig drawn in Tree.jsx reaches the leaf
              directly, so a separate stem here would point in a fixed local
              direction (sideways) and look wrong against varied branches. */}
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
