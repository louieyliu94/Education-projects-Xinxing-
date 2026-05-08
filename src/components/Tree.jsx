import React from 'react'
import Leaf from './Leaf.jsx'
import { LEAF_POSITIONS } from './leafPositions.js'

const VIEW_W = 1000
const VIEW_H = 900

// Anchor points where the trunk forks into the three primary boughs.
// Each leaf is reached by drawing a curve from one of these anchors to its
// position. This keeps leaves visually attached to the tree.
const FORK_LEFT   = { x: 472, y: 540 }
const FORK_CENTER = { x: 500, y: 460 }
const FORK_RIGHT  = { x: 528, y: 540 }

// For each leaf index, choose which fork its branch grows from. Hand-tuned
// so the canopy looks balanced. Add an entry for every new leafPosition.
const FORK_ASSIGNMENTS = [
  'L', 'L', 'L',          // 0–2  far left cluster
  'L', 'C',               // 3–4  upper-left
  'C', 'C', 'C',          // 5–7  crown
  'C', 'R',               // 8–9  upper-right
  'R', 'R', 'R',          // 10–12 right cluster
  'L',                    // 13   lower-left drooper
  'L', 'C', 'C', 'R',     // 14–17 spares
  'R', 'L', 'L', 'R',     // 18–21
  'C', 'C'                // 22–23
]

function forkFor(i) {
  const code = FORK_ASSIGNMENTS[i] || (i % 3 === 0 ? 'L' : i % 3 === 1 ? 'C' : 'R')
  if (code === 'L') return FORK_LEFT
  if (code === 'R') return FORK_RIGHT
  return FORK_CENTER
}

// Return SVG path data for a curved branch from (x1,y1) to (x2,y2). Two
// control points biased toward the start give it the natural "pulling toward
// the trunk" arc.
function branchPath(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const cp1x = x1 + dx * 0.25
  const cp1y = y1 + dy * 0.55
  const cp2x = x1 + dx * 0.65
  const cp2y = y1 + dy * 0.85
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`
}

export default function Tree({ projects, onLeafClick }) {
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
        {/* Watercolor edge displacement */}
        <filter id="watercolor" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>

        <filter id="watercolor-strong" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>

        {/* Trunk gradient — earthy brown blending into ink black */}
        <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="35%" stopColor="#3d2116" />
          <stop offset="70%" stopColor="#241510" />
          <stop offset="100%" stopColor="#0e0907" />
        </linearGradient>

        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2c1a10" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="inkwashRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8412B" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#C8412B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inkwashBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ink-wash halos behind canopy */}
      <g filter="url(#watercolor-strong)" opacity="0.85">
        <circle cx="320" cy="280" r="200" fill="url(#inkwashRed)" />
        <circle cx="700" cy="270" r="220" fill="url(#inkwashBlue)" />
        <circle cx="500" cy="180" r="170" fill="url(#inkwashRed)" />
      </g>

      {/* Ground shadow */}
      <ellipse cx={VIEW_W / 2} cy={VIEW_H - 30} rx="260" ry="20" fill="url(#groundShadow)" />

      {/* TRUNK
          Tapered, asymmetric, with flared buttress roots — Bombax ceiba style.
          The left and right edges deliberately differ: left has a slight
          inward dip near mid-trunk, right curves out a little wider, so the
          silhouette doesn't read as a symmetric "bottle". */}
      <g filter="url(#watercolor)">
        <path
          d="
            M 380 880
            C 410 850, 440 815, 455 760
            C 465 720, 470 670, 472 620
            C 473 595, 475 575, 478 555
            L 478 540
            C 484 525, 492 510, 500 470

            C 508 510, 516 525, 522 540
            L 522 555
            C 525 575, 527 600, 528 625
            C 530 675, 535 720, 545 758
            C 560 810, 590 845, 620 880
            Z
          "
          fill="url(#trunkGradient)"
        />

        {/* Buttress roots — splay outward asymmetrically */}
        <path
          d="M 420 880 C 380 870, 340 870, 300 882 L 470 882 Z"
          fill="url(#trunkGradient)"
          opacity="0.95"
        />
        <path
          d="M 580 880 C 625 870, 670 872, 710 882 L 530 882 Z"
          fill="url(#trunkGradient)"
          opacity="0.95"
        />
        <path
          d="M 460 880 C 440 870, 415 868, 395 880 L 480 882 Z"
          fill="url(#trunkGradient)"
          opacity="0.85"
        />

        {/* Bark texture — vertical hairlines on the trunk */}
        <g stroke="#1a0e08" strokeOpacity="0.28" strokeLinecap="round" fill="none">
          <path d="M 467 560 C 466 620, 466 700, 460 800" strokeWidth="1.2" />
          <path d="M 488 480 C 487 560, 487 680, 484 820" strokeWidth="1.0" />
          <path d="M 510 480 C 511 560, 512 680, 516 820" strokeWidth="1.0" />
          <path d="M 532 560 C 534 620, 535 700, 542 800" strokeWidth="1.2" />
        </g>
      </g>

      {/* MAIN BRANCHES — three main forks emerging cleanly from the upper trunk */}
      <g filter="url(#watercolor)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round">
        {/* Left bough */}
        <path
          d={`M ${FORK_LEFT.x} ${FORK_LEFT.y} C 420 480, 350 420, 250 380`}
          strokeWidth="22"
        />
        {/* Center bough */}
        <path
          d={`M ${FORK_CENTER.x} ${FORK_CENTER.y} C 498 380, 502 280, 504 200`}
          strokeWidth="20"
        />
        {/* Right bough */}
        <path
          d={`M ${FORK_RIGHT.x} ${FORK_RIGHT.y} C 580 480, 660 420, 770 380`}
          strokeWidth="22"
        />

        {/* Secondary boughs — feeding the leaf clusters from each main bough */}
        <path d="M 350 410 C 280 380, 200 350, 130 320" strokeWidth="11" />
        <path d="M 320 420 C 260 380, 200 320, 170 250" strokeWidth="10" />
        <path d="M 400 400 C 360 360, 320 300, 305 230" strokeWidth="9" />

        <path d="M 498 350 C 470 290, 440 230, 420 150" strokeWidth="10" />
        <path d="M 502 350 C 530 290, 560 230, 580 150" strokeWidth="10" />
        <path d="M 504 230 C 500 180, 500 130, 503 90" strokeWidth="9" />

        <path d="M 670 410 C 730 380, 800 350, 880 320" strokeWidth="11" />
        <path d="M 700 420 C 740 380, 800 320, 820 250" strokeWidth="10" />
        <path d="M 620 410 C 650 360, 680 300, 690 235" strokeWidth="9" />
      </g>

      {/* TWIGS — each twig grows from a fork toward its leaf. We draw these
          first so the leaf sits at the very tip. */}
      <g filter="url(#watercolor)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" strokeWidth="3.5">
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          const fork = forkFor(i)
          // Pull twig endpoint slightly behind leaf center so the leaf overlaps
          const angle = Math.atan2(pos.y - fork.y, pos.x - fork.x)
          const tipX = pos.x - Math.cos(angle) * 8
          const tipY = pos.y - Math.sin(angle) * 8
          return (
            <path key={`twig-${project.id}`} d={branchPath(fork.x, fork.y, tipX, tipY)} />
          )
        })}
      </g>

      {/* Sketchy red accents — echo the school seal's strokes */}
      <g
        filter="url(#watercolor)"
        fill="none"
        stroke="#C8412B"
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeWidth="1.1"
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
    </svg>
  )
}
