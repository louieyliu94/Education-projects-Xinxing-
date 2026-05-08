import React from 'react'
import Leaf from './Leaf.jsx'
import { LEAF_POSITIONS } from './leafPositions.js'

// viewBox is fixed; CSS scales the SVG to the viewport so the tree resizes
// dynamically with the window. Coordinates inside are stable.
const VIEW_W = 1000
const VIEW_H = 900

export default function Tree({ projects, onLeafClick }) {
  // If there are more projects than predefined positions, cycle — but warn so
  // we can extend LEAF_POSITIONS as the school grows.
  if (projects.length > LEAF_POSITIONS.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `Tree has ${projects.length} projects but only ${LEAF_POSITIONS.length} leaf slots. Extend leafPositions.js.`
    )
  }

  return (
    <svg
      className="tree-svg"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="A kapok tree where each leaf is a student portfolio"
    >
      <defs>
        {/* Watercolor edge displacement — gives every stroke a soft, bleeding edge */}
        <filter id="watercolor" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>

        <filter id="watercolor-strong" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>

        {/* Paper grain — subtle texture overlay on trunk */}
        <filter id="paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
          <feColorMatrix
            values="0 0 0 0 0.18
                    0 0 0 0 0.10
                    0 0 0 0 0.06
                    0 0 0 0.18 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Trunk gradient — brown blending into black */}
        <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="40%" stopColor="#4a2c1a" />
          <stop offset="75%" stopColor="#2a1a12" />
          <stop offset="100%" stopColor="#0e0a08" />
        </linearGradient>

        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2c1a10" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        {/* Soft ground shadow */}
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>

        {/* Inkwash circles behind canopy — Chinese watercolor halos */}
        <radialGradient id="inkwashRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8412B" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#C8412B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inkwashBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Watercolor halos — Chinese ink wash pooling behind the canopy */}
      <g filter="url(#watercolor-strong)" opacity="0.9">
        <circle cx="320" cy="300" r="220" fill="url(#inkwashRed)" />
        <circle cx="700" cy="280" r="240" fill="url(#inkwashBlue)" />
        <circle cx="500" cy="200" r="180" fill="url(#inkwashRed)" />
      </g>

      {/* Ground shadow ellipse */}
      <ellipse cx={VIEW_W / 2} cy={VIEW_H - 40} rx="280" ry="22" fill="url(#groundShadow)" />

      {/* TRUNK — hand-drawn sketchy path, slightly wobbled. Inspired by Bombax ceiba's
          buttressed base and the seal-like strokes of the school logo. */}
      <g filter="url(#watercolor)">
        <path
          d="
            M 470 870
            C 455 820, 448 760, 458 700
            C 466 650, 470 600, 478 560
            C 482 530, 485 510, 495 490
            L 505 490
            C 515 510, 518 530, 522 560
            C 530 600, 534 650, 542 700
            C 552 760, 545 820, 530 870
            Z
          "
          fill="url(#trunkGradient)"
        />
        {/* Buttress roots flaring out at the base */}
        <path
          d="M 470 870 C 430 855, 400 850, 360 870 L 540 870 Z"
          fill="url(#trunkGradient)"
          opacity="0.95"
        />
        <path
          d="M 530 870 C 570 855, 600 850, 640 870 L 460 870 Z"
          fill="url(#trunkGradient)"
          opacity="0.95"
        />
      </g>

      {/* MAIN BRANCHES — three primary forks, like Bombax ceiba's open canopy */}
      <g filter="url(#watercolor)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round">
        {/* Left main branch */}
        <path d="M 478 560 C 420 510, 340 470, 230 410" strokeWidth="22" />
        {/* Center main branch */}
        <path d="M 500 490 C 500 420, 495 340, 505 240" strokeWidth="20" />
        {/* Right main branch */}
        <path d="M 522 560 C 590 510, 680 470, 800 400" strokeWidth="22" />

        {/* Left sub-branches */}
        <path d="M 320 450 C 280 410, 230 380, 160 350" strokeWidth="11" />
        <path d="M 280 430 C 240 380, 200 320, 180 270" strokeWidth="10" />
        <path d="M 380 470 C 340 430, 300 380, 280 330" strokeWidth="10" />

        {/* Center sub-branches */}
        <path d="M 500 380 C 460 340, 410 300, 380 260" strokeWidth="11" />
        <path d="M 500 380 C 540 340, 590 300, 620 260" strokeWidth="11" />
        <path d="M 502 290 C 480 250, 460 210, 450 170" strokeWidth="9" />
        <path d="M 504 290 C 526 250, 546 210, 556 170" strokeWidth="9" />

        {/* Right sub-branches */}
        <path d="M 680 440 C 720 400, 770 360, 850 330" strokeWidth="11" />
        <path d="M 720 420 C 760 370, 800 320, 820 270" strokeWidth="10" />
        <path d="M 620 460 C 660 420, 700 380, 720 330" strokeWidth="10" />

        {/* Twig-tips reaching toward each leaf cluster */}
        <path d="M 160 350 C 130 330, 110 320, 90 320" strokeWidth="5" />
        <path d="M 180 270 C 160 240, 145 220, 130 200" strokeWidth="5" />
        <path d="M 280 330 C 260 300, 250 280, 245 260" strokeWidth="5" />
        <path d="M 380 260 C 360 240, 340 220, 325 205" strokeWidth="5" />
        <path d="M 450 170 C 440 140, 430 120, 425 105" strokeWidth="5" />
        <path d="M 556 170 C 565 140, 575 120, 580 105" strokeWidth="5" />
        <path d="M 620 260 C 640 240, 660 220, 675 205" strokeWidth="5" />
        <path d="M 720 330 C 745 305, 765 285, 775 270" strokeWidth="5" />
        <path d="M 820 270 C 840 250, 855 240, 865 225" strokeWidth="5" />
        <path d="M 850 330 C 880 320, 905 320, 920 320" strokeWidth="5" />
      </g>

      {/* Sketchy red accents — echoing the school's seal lines */}
      <g
        filter="url(#watercolor)"
        fill="none"
        stroke="#C8412B"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeWidth="1.2"
      >
        <path d="M 478 700 C 482 660, 480 620, 484 580" />
        <path d="M 522 700 C 518 660, 520 620, 516 580" />
        <path d="M 488 800 C 492 760, 490 730, 494 710" />
      </g>

      {/* Paper grain over trunk */}
      <g style={{ mixBlendMode: 'multiply' }} opacity="0.55">
        <rect x="440" y="480" width="120" height="400" filter="url(#paper)" fill="#000" />
      </g>

      {/* LEAVES */}
      <g>
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          return (
            <Leaf
              key={project.id}
              project={project}
              x={pos.x}
              y={pos.y}
              rotate={pos.rotate}
              scale={pos.scale}
              swayDelay={(i * 0.37) % 4}
              swayDuration={4 + ((i * 0.6) % 3)}
              onClick={() => onLeafClick(project)}
            />
          )
        })}
      </g>
    </svg>
  )
}
