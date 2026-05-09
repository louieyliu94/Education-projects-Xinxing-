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

      {/* TRUNK — slim. ~70px at base, ~30px at top, gentle taper, no bottle. */}
      <g filter="url(#watercolor)" className="trunk">
        <path
          d="
            M 466 880
            C 468 820, 471 760, 474 700
            C 476 640, 478 580, 481 520
            C 482 500, 484 488, 486 480

            L 514 480
            C 516 488, 518 500, 519 520
            C 522 580, 524 640, 526 700
            C 529 760, 532 820, 534 880
            Z
          "
          fill="url(#trunkGradient)"
        />
        {/* Bark hairlines */}
        <g stroke="#1a0e08" strokeOpacity="0.32" strokeLinecap="round" fill="none" filter="url(#rough)">
          <path d="M 480 500 C 480 620, 479 740, 477 820" strokeWidth="0.7" />
          <path d="M 495 488 C 495 620, 495 740, 494 820" strokeWidth="0.6" />
          <path d="M 505 488 C 505 620, 505 740, 506 820" strokeWidth="0.6" />
          <path d="M 520 500 C 521 620, 521 740, 523 820" strokeWidth="0.7" />
        </g>
      </g>

      {/* MAIN BRANCHES — multi-segment curves with bends and joints, like
          real kapok boughs. Each path uses chained cubic curves so the
          branch wobbles, doesn't read as a single ruled arc. */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" className="branches">
        {/* Left main bough — bends down then up before reaching out */}
        <path d="M 486 480
                 C 460 470, 430 478, 410 460
                 C 390 442, 360 432, 320 410
                 C 280 392, 240 388, 210 376" strokeWidth="11" />
        {/* Center main bough — slight S-curve upward */}
        <path d="M 500 480
                 C 498 440, 504 400, 500 360
                 C 496 320, 502 270, 504 220
                 C 504 200, 504 190, 504 170" strokeWidth="10" />
        {/* Right main bough */}
        <path d="M 514 480
                 C 540 470, 568 478, 590 460
                 C 612 442, 642 432, 680 412
                 C 720 392, 760 386, 790 376" strokeWidth="11" />

        {/* Secondary boughs — left side, with bends */}
        <path d="M 380 432
                 C 350 410, 290 380, 230 360
                 C 180 348, 140 332, 110 320" strokeWidth="5.5" />
        <path d="M 360 425
                 C 320 388, 260 352, 220 312
                 C 200 290, 180 264, 160 240" strokeWidth="5" />
        <path d="M 420 420
                 C 400 380, 380 340, 360 300
                 C 340 260, 320 230, 305 220" strokeWidth="4.5" />

        {/* Secondary boughs — center */}
        <path d="M 500 360
                 C 480 320, 460 280, 440 230
                 C 430 200, 420 160, 420 130" strokeWidth="5" />
        <path d="M 504 360
                 C 522 320, 542 280, 562 230
                 C 572 200, 580 160, 580 130" strokeWidth="5" />
        <path d="M 504 220
                 C 502 188, 502 150, 503 110
                 L 503 80" strokeWidth="4.5" />

        {/* Secondary boughs — right side */}
        <path d="M 620 420
                 C 660 388, 720 358, 770 340
                 C 820 326, 860 320, 890 320" strokeWidth="5.5" />
        <path d="M 640 415
                 C 680 380, 730 348, 770 308
                 C 800 280, 820 258, 830 240" strokeWidth="5" />
        <path d="M 580 410
                 C 600 372, 622 332, 650 290
                 C 670 258, 685 232, 695 220" strokeWidth="4.5" />

        {/* Tertiary twigs — short little forks */}
        <path d="M 280 386 C 260 370, 240 360, 220 358" strokeWidth="2.5" />
        <path d="M 360 410 C 340 396, 320 388, 305 386" strokeWidth="2.5" />
        <path d="M 720 388 C 740 372, 760 364, 780 360" strokeWidth="2.5" />
        <path d="M 640 408 C 660 392, 680 384, 695 382" strokeWidth="2.5" />
        <path d="M 480 320 C 470 300, 460 286, 455 280" strokeWidth="2.2" />
        <path d="M 524 320 C 534 300, 544 286, 549 280" strokeWidth="2.2" />
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
