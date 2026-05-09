import React, { useEffect, useState } from 'react'
import Leaf from './Leaf.jsx'
import Bird from './Bird.jsx'
import { LEAF_POSITIONS } from './leafPositions.js'

const VIEW_W = 1000
const VIEW_H = 900

const FORK_LEFT   = { x: 470, y: 480 }
const FORK_CENTER = { x: 500, y: 460 }
const FORK_RIGHT  = { x: 530, y: 480 }

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
  const [disturbCount, setDisturbCount] = useState(0)
  const [gust, setGust] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setGust((g) => g + 1), 5500 + Math.random() * 2500)
    return () => clearInterval(id)
  }, [])

  const handleDisturb = () => setDisturbCount((c) => c + 1)

  return (
    <svg
      className="tree-svg"
      data-gust={gust % 2}
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
        <filter id="watercolor-mountain" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="18" />
        </filter>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>

        <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="40%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0e0907" />
        </linearGradient>
        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        {/* Layered mountain washes — atmospheric perspective: farther = paler */}
        <linearGradient id="mountFar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8aa0c4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8aa0c4" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="mountMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5a78a8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5a78a8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="mountNear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a567f" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3a567f" stopOpacity="0.08" />
        </linearGradient>

        <radialGradient id="haloGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6e9a52" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6e9a52" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloIndigo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a2418" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3a2418" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* DISTANT MOUNTAINS — three jagged-peak layers fading into mist.
          Inspired by Guilin-style ink landscape, not copied. */}
      <g className="mist-far" filter="url(#watercolor-mountain)">
        {/* Furthest layer */}
        <path
          fill="url(#mountFar)"
          d="M -20 720
             L 60 660 L 110 690 L 170 600 L 230 670
             L 290 580 L 340 640 L 400 590 L 460 650
             L 520 560 L 580 640 L 650 600 L 720 670
             L 790 600 L 860 660 L 940 620 L 1020 670
             L 1020 760 L -20 760 Z"
        />
        {/* Mid layer */}
        <path
          fill="url(#mountMid)"
          d="M -20 740
             L 50 690 L 130 720 L 210 620 L 280 700
             L 360 590 L 430 700 L 510 610 L 580 700
             L 650 640 L 730 700 L 810 650 L 880 700
             L 950 660 L 1020 720
             L 1020 770 L -20 770 Z"
        />
        {/* Nearest layer — sharper peaks */}
        <path
          fill="url(#mountNear)"
          d="M -20 760
             L 80 720 L 150 750 L 230 680 L 320 740
             L 400 680 L 470 740 L 540 700 L 620 740
             L 700 690 L 780 740 L 870 720 L 950 750 L 1020 740
             L 1020 780 L -20 780 Z"
        />
      </g>

      {/* Soft watercolor halos in canopy */}
      <g filter="url(#watercolor-strong)">
        <circle cx="320" cy="280" r="220" fill="url(#haloGreen)" />
        <circle cx="700" cy="270" r="240" fill="url(#haloIndigo)" />
        <circle cx="500" cy="170" r="180" fill="url(#haloGreen)" />
      </g>

      {/* Slow drifting mist */}
      <g className="mist-drift" opacity="0.55" filter="url(#watercolor-strong)">
        <ellipse cx="300" cy="540" rx="280" ry="40" fill="#FFFFFF" opacity="0.5" />
        <ellipse cx="700" cy="630" rx="300" ry="35" fill="#FFFFFF" opacity="0.45" />
      </g>

      <ellipse cx={VIEW_W / 2} cy={VIEW_H - 30} rx="220" ry="18" fill="url(#groundShadow)" />

      {/* TRUNK — even thickness, very gentle taper, no bottle.
          Width ~120 at base, ~80 at top. */}
      <g filter="url(#watercolor)" className="trunk">
        <path
          d="
            M 440 880
            C 444 820, 448 760, 452 700
            C 455 640, 458 580, 461 520
            C 463 500, 466 488, 470 480

            L 530 480
            C 534 488, 537 500, 539 520
            C 542 580, 545 640, 548 700
            C 552 760, 556 820, 560 880
            Z
          "
          fill="url(#trunkGradient)"
        />
        {/* Bark hairlines — vertical, slightly broken */}
        <g stroke="#1a0e08" strokeOpacity="0.30" strokeLinecap="round" fill="none" filter="url(#rough)">
          <path d="M 458 500 C 458 600, 457 700, 454 820" strokeWidth="0.9" />
          <path d="M 480 488 C 480 600, 479 700, 477 820" strokeWidth="0.8" />
          <path d="M 500 488 C 500 600, 500 700, 500 820" strokeWidth="0.8" />
          <path d="M 520 488 C 520 600, 521 700, 523 820" strokeWidth="0.8" />
          <path d="M 542 500 C 542 600, 543 700, 546 820" strokeWidth="0.9" />
        </g>
      </g>

      {/* MAIN BRANCHES — emerge from the top of the trunk */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" className="branches">
        <path d={`M ${FORK_LEFT.x} ${FORK_LEFT.y} C 420 440, 350 400, 230 380`} strokeWidth="13" />
        <path d={`M ${FORK_CENTER.x} ${FORK_CENTER.y} C 500 380, 502 270, 504 180`} strokeWidth="12" />
        <path d={`M ${FORK_RIGHT.x} ${FORK_RIGHT.y} C 580 440, 660 400, 790 380`} strokeWidth="13" />

        <path d="M 340 400 C 270 370, 180 340, 110 320" strokeWidth="6" />
        <path d="M 320 405 C 250 360, 190 310, 160 240" strokeWidth="5.5" />
        <path d="M 400 385 C 360 340, 320 280, 305 220" strokeWidth="5" />

        <path d="M 498 350 C 470 290, 440 220, 420 130" strokeWidth="5.5" />
        <path d="M 502 350 C 530 290, 560 220, 580 130" strokeWidth="5.5" />
        <path d="M 504 220 C 500 170, 500 120, 503 80" strokeWidth="5" />

        <path d="M 660 400 C 730 370, 810 340, 890 320" strokeWidth="6" />
        <path d="M 690 405 C 740 360, 800 310, 830 240" strokeWidth="5.5" />
        <path d="M 610 385 C 650 340, 680 280, 695 220" strokeWidth="5" />
      </g>

      {/* Twigs to each leaf */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" strokeWidth="1.8">
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          const fork = forkFor(i)
          const angle = Math.atan2(pos.y - fork.y, pos.x - fork.x)
          const tipX = pos.x - Math.cos(angle) * 4
          const tipY = pos.y - Math.sin(angle) * 4
          return <path key={`twig-${project.id}`} d={branchPath(fork.x, fork.y, tipX, tipY)} />
        })}
      </g>

      {/* LEAVES — rotation derived from the angle between leaf and its fork
          so the leaf's stem always points back toward the branch. */}
      <g>
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          const fork = forkFor(i)
          // Angle from fork to leaf, in degrees. Leaf's stem-end is at -X in
          // its local frame, so rotating by this angle aligns the stem to the fork.
          const angleDeg = Math.atan2(pos.y - fork.y, pos.x - fork.x) * 180 / Math.PI
          // Add a tiny per-leaf jitter so the canopy doesn't look mechanical.
          const jitter = ((i * 37) % 11) - 5
          return (
            <Leaf
              key={project.id}
              project={project}
              x={pos.x}
              y={pos.y}
              rotate={angleDeg + jitter}
              scale={pos.scale}
              swayDelay={(i * 0.37) % 4}
              swayDuration={4 + ((i * 0.6) % 3)}
              onClick={() => onLeafClick(project)}
              onDisturb={handleDisturb}
            />
          )
        })}
      </g>

      {/* BIRDS — fly far away when any leaf is touched */}
      <Bird x={300} y={395} kind="perched" scale={1.1} delay={0} duration={3.2} disturbCount={disturbCount} flyAwayX={-260} flyAwayY={-220} />
      <Bird x={780} y={150} kind="flying" scale={1.0} delay={0} duration={18} disturbCount={disturbCount} flyAwayX={300} flyAwayY={-260} />
      <Bird x={200} y={120} kind="flying" scale={0.85} delay={6} duration={22} disturbCount={disturbCount} flyAwayX={-320} flyAwayY={-240} />
    </svg>
  )
}
