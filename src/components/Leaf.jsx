import React from 'react'

// Color palettes for the four leaf types — watercolor layers stack to create depth.
const PALETTES = {
  blue:   { core: '#1B2A6B', mid: '#3A5BA0', edge: '#7FA8D6', vein: '#0E1742' },
  green:  { core: '#2F6B3A', mid: '#5BA05F', edge: '#A8D67F', vein: '#173E1F' },
  yellow: { core: '#D9A521', mid: '#F0C84A', edge: '#FBE38A', vein: '#7A5A0E' },
  red:    { core: '#C8412B', mid: '#E26A4E', edge: '#F4A98E', vein: '#6E1F12' }
}

// A single leaf — kapok-inspired pointed oval.
//
// IMPORTANT: positioning lives on the OUTER <g>, the sway animation lives on
// the INNER <g>. Earlier they were on the same node and the CSS keyframe's
// transform was overwriting each leaf's translate(x,y), which clumped every
// leaf at the origin.
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
  const palette = PALETTES[project.color] || PALETTES.green

  return (
    <g transform={`translate(${x} ${y})`}>
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
        <g transform={`rotate(${rotate}) scale(${scale})`}>
          {/* Outer watercolor bleed */}
          <ellipse cx="0" cy="0" rx="34" ry="14" fill={palette.edge} opacity="0.55" filter="url(#watercolor-strong)" />
          {/* Mid wash */}
          <ellipse cx="0" cy="0" rx="28" ry="11" fill={palette.mid} opacity="0.85" filter="url(#watercolor)" />
          {/* Core — most saturated */}
          <ellipse cx="0" cy="0" rx="22" ry="8" fill={palette.core} opacity="0.95" filter="url(#watercolor)" />
          {/* Central vein */}
          <line x1="-26" y1="0" x2="26" y2="0" stroke="#C8412B" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
          {/* Stem */}
          <line x1="-30" y1="0" x2="-38" y2="2" stroke={palette.vein} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />

          {/* Small star — Xinxing means "new star". One per leaf. */}
          <g transform="translate(8 -1) scale(0.55)" opacity="0.9">
            <path
              d="M 0 -6 L 1.6 -1.8 L 6 -1.8 L 2.5 0.8 L 3.8 5 L 0 2.5 L -3.8 5 L -2.5 0.8 L -6 -1.8 L -1.6 -1.8 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </g>
        </g>

        {/* Hover label */}
        <g className="leaf-label" pointerEvents="none">
          <rect x="-72" y="22" width="144" height="34" rx="6" fill="#FFFEF6" stroke="#1B2A6B" strokeOpacity="0.25" />
          <text x="0" y="36" textAnchor="middle" fontSize="10" fill="#1B2A6B" fontWeight="600">
            {project.studentNameZh} · {project.studentNameEn}
          </text>
          <text x="0" y="49" textAnchor="middle" fontSize="9" fill="#3a2418" fontStyle="italic">
            {project.projectTitleEn}
          </text>
        </g>
      </g>
    </g>
  )
}
