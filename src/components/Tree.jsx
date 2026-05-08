import React from 'react'
import Leaf from './Leaf.jsx'
import Bird from './Bird.jsx'
import { LEAF_POSITIONS } from './leafPositions.js'

const VIEW_W = 1000
const VIEW_H = 900

const FORK_LEFT   = { x: 472, y: 540 }
const FORK_CENTER = { x: 500, y: 460 }
const FORK_RIGHT  = { x: 528, y: 540 }

// Per-leaf assignment to one of the three forks.
const FORK_ASSIGNMENTS = ['L','L','L','L','C','C','C','C','C','R','R','R','R','L','L','C','C','R','R','L','L','R','C','C']
function forkFor(i) {
  const code = FORK_ASSIGNMENTS[i] || (i % 3 === 0 ? 'L' : i % 3 === 1 ? 'C' : 'R')
  if (code === 'L') return FORK_LEFT
  if (code === 'R') return FORK_RIGHT
  return FORK_CENTER
}

function branchPath(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const cp1x = x1 + dx * 0.3
  const cp1y = y1 + dy * 0.55
  const cp2x = x1 + dx * 0.7
  const cp2y = y1 + dy * 0.85
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`
}

export default function Tree({ projects, onLeafClick }) {
  if (projects.length > LEAF_POSITIONS.length) {
    // eslint-disable-next-line no-console
    console.warn(`Tree has ${projects.length} leaves but only ${LEAF_POSITIONS.length} slots.`)
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
        <filter id="watercolor" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
        <filter id="watercolor-strong" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="11" />
        </filter>
        {/* Sketchy stroke filter — gives ink lines a slightly broken, hand-drawn edge */}
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>

        {/* Trunk: deep brown to ink black, no bottle bulge */}
        <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="40%" stopColor="#2e1a10" />
          <stop offset="100%" stopColor="#0e0907" />
        </linearGradient>

        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        {/* Background ink-wash halos — softer now */}
        <radialGradient id="haloGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6e9a52" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6e9a52" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloYellow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9b14a" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#d9b14a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5d86b4" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#5d86b4" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a2418" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3a2418" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Watercolor halos */}
      <g filter="url(#watercolor-strong)">
        <circle cx="320" cy="280" r="220" fill="url(#haloGreen)" />
        <circle cx="700" cy="270" r="240" fill="url(#haloYellow)" />
        <circle cx="500" cy="170" r="180" fill="url(#haloGreen)" />
        <circle cx="200" cy="450" r="160" fill="url(#haloBlue)" />
      </g>

      {/* Ground shadow */}
      <ellipse cx={VIEW_W / 2} cy={VIEW_H - 30} rx="280" ry="22" fill="url(#groundShadow)" />

      {/* TRUNK — tapered, asymmetric, no bottle */}
      <g filter="url(#watercolor)">
        <path
          d="
            M 380 880
            C 408 845, 432 810, 448 760
            C 460 720, 466 670, 470 620
            C 472 590, 475 565, 480 545
            L 482 530
            C 487 510, 494 490, 500 460

            C 506 490, 514 510, 520 530
            L 522 545
            C 526 565, 528 595, 530 625
            C 533 675, 540 720, 552 758
            C 568 808, 595 845, 622 880
            Z
          "
          fill="url(#trunkGradient)"
        />
        {/* Buttress roots */}
        <path d="M 420 880 C 380 870, 335 868, 295 882 L 470 882 Z" fill="url(#trunkGradient)" opacity="0.95" />
        <path d="M 580 880 C 625 870, 675 870, 715 882 L 530 882 Z" fill="url(#trunkGradient)" opacity="0.95" />

        {/* Bark hairlines */}
        <g stroke="#1a0e08" strokeOpacity="0.32" strokeLinecap="round" fill="none" filter="url(#rough)">
          <path d="M 470 560 C 466 620, 466 700, 458 800" strokeWidth="1.0" />
          <path d="M 488 480 C 487 560, 487 680, 482 820" strokeWidth="0.9" />
          <path d="M 510 480 C 511 560, 512 680, 518 820" strokeWidth="0.9" />
          <path d="M 530 560 C 534 620, 537 700, 544 800" strokeWidth="1.0" />
        </g>
      </g>

      {/* MAIN BRANCHES — three boughs from the upper trunk. Stroked sketchy. */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round">
        <path d={`M ${FORK_LEFT.x} ${FORK_LEFT.y} C 420 480, 340 420, 230 380`} strokeWidth="20" />
        <path d={`M ${FORK_CENTER.x} ${FORK_CENTER.y} C 498 380, 502 270, 504 180`} strokeWidth="18" />
        <path d={`M ${FORK_RIGHT.x} ${FORK_RIGHT.y} C 580 480, 670 420, 790 380`} strokeWidth="20" />

        {/* Secondary branches feeding outer leaf clusters */}
        <path d="M 340 410 C 270 380, 180 350, 110 320" strokeWidth="9" />
        <path d="M 320 415 C 250 370, 190 320, 160 240" strokeWidth="8" />
        <path d="M 400 395 C 360 350, 320 290, 305 220" strokeWidth="7" />

        <path d="M 498 350 C 470 290, 440 220, 420 130" strokeWidth="8" />
        <path d="M 502 350 C 530 290, 560 220, 580 130" strokeWidth="8" />
        <path d="M 504 220 C 500 170, 500 120, 503 80" strokeWidth="7" />

        <path d="M 660 410 C 730 380, 810 350, 890 320" strokeWidth="9" />
        <path d="M 690 415 C 740 370, 800 320, 830 240" strokeWidth="8" />
        <path d="M 610 395 C 650 350, 680 290, 695 220" strokeWidth="7" />
      </g>

      {/* TWIGS to each leaf */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" strokeWidth="2.8">
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          const fork = forkFor(i)
          const angle = Math.atan2(pos.y - fork.y, pos.x - fork.x)
          const tipX = pos.x - Math.cos(angle) * 6
          const tipY = pos.y - Math.sin(angle) * 6
          return <path key={`twig-${project.id}`} d={branchPath(fork.x, fork.y, tipX, tipY)} />
        })}
      </g>

      {/* Sketchy red ink accents — subtle, evoking the school seal */}
      <g
        filter="url(#rough)"
        fill="none"
        stroke="#C8412B"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeWidth="0.9"
      >
        <path d="M 480 700 C 482 660, 480 620, 484 580" />
        <path d="M 522 700 C 520 660, 522 620, 518 580" />
        <path d="M 488 820 C 492 780, 490 740, 494 720" />
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

      {/* BIRDS — one perched on a left bough, two drifting across the canopy */}
      <Bird x={300} y={395} kind="perched" scale={1.0} delay={0} duration={3} color="#C8412B" />
      <Bird x={780} y={150} kind="flying" scale={0.85} delay={0} duration={18} color="#C8412B" />
      <Bird x={200} y={120} kind="flying" scale={0.7} delay={6} duration={22} color="#3a2418" />
    </svg>
  )
}
