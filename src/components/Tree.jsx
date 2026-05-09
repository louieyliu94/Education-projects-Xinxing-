import React, { useEffect, useState } from 'react'
import Leaf from './Leaf.jsx'
import Bird from './Bird.jsx'
import { LEAF_POSITIONS } from './leafPositions.js'

const VIEW_W = 1000
const VIEW_H = 900

const FORK_LEFT   = { x: 488, y: 530 }
const FORK_CENTER = { x: 502, y: 470 }
const FORK_RIGHT  = { x: 516, y: 530 }

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
  // Periodic gust — sets a CSS variable on the SVG that biases the sway,
  // creating the feeling of an occasional breeze passing through the tree.
  const [gust, setGust] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGust((g) => g + 1)
    }, 5200 + Math.random() * 2500)
    return () => clearInterval(interval)
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
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>

        <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="40%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0a0707" />
        </linearGradient>

        {/* Distant mountain washes — soft indigo to evoke the reference */}
        <linearGradient id="mistMountain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="mistMountain2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5d86b4" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#5d86b4" stopOpacity="0.02" />
        </linearGradient>

        <radialGradient id="haloGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6e9a52" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6e9a52" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloIndigo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B2A6B" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#1B2A6B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8412B" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#C8412B" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a2418" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3a2418" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* DISTANT MOUNTAINS — misty silhouettes far behind the tree.
          Gives the page the atmospheric feel of the reference watercolor
          without copying it. */}
      <g className="mist-far" filter="url(#watercolor-strong)" opacity="0.85">
        <path
          d="M 0 700
             L 120 580 L 220 640 L 340 540 L 460 600
             L 580 520 L 700 600 L 820 530 L 940 590 L 1000 560
             L 1000 750 L 0 750 Z"
          fill="url(#mistMountain2)"
        />
        <path
          d="M 0 720
             L 80 660 L 180 700 L 300 620 L 420 680
             L 540 600 L 660 670 L 780 610 L 880 660 L 1000 640
             L 1000 760 L 0 760 Z"
          fill="url(#mistMountain)"
        />
      </g>

      {/* Watercolor halos */}
      <g filter="url(#watercolor-strong)">
        <circle cx="320" cy="280" r="220" fill="url(#haloGreen)" />
        <circle cx="700" cy="270" r="240" fill="url(#haloIndigo)" />
        <circle cx="500" cy="170" r="180" fill="url(#haloGreen)" />
        <circle cx="200" cy="450" r="160" fill="url(#haloRed)" />
      </g>

      {/* Slow drifting mist — translates very gently for ambient motion */}
      <g className="mist-drift" opacity="0.55" filter="url(#watercolor-strong)">
        <ellipse cx="300" cy="500" rx="280" ry="40" fill="#FFFFFF" opacity="0.5" />
        <ellipse cx="700" cy="600" rx="300" ry="35" fill="#FFFFFF" opacity="0.45" />
      </g>

      <ellipse cx={VIEW_W / 2} cy={VIEW_H - 30} rx="220" ry="18" fill="url(#groundShadow)" />

      {/* TRUNK — slim, tapered, asymmetric. Base ~120px wide, narrows quickly. */}
      <g filter="url(#watercolor)" className="trunk">
        <path
          d="
            M 444 880
            C 460 838, 472 792, 478 740
            C 482 700, 486 660, 489 620
            C 491 595, 493 575, 495 555
            L 496 540
            C 498 520, 500 500, 500 470

            C 502 500, 504 520, 506 540
            L 507 555
            C 509 575, 511 600, 513 625
            C 516 670, 522 710, 528 745
            C 538 798, 552 842, 568 880
            Z
          "
          fill="url(#trunkGradient)"
        />
        {/* Subtle buttress flare */}
        <path d="M 470 880 C 442 868, 410 868, 380 882 L 502 882 Z" fill="url(#trunkGradient)" opacity="0.95" />
        <path d="M 540 880 C 568 868, 600 870, 630 882 L 510 882 Z" fill="url(#trunkGradient)" opacity="0.95" />

        <g stroke="#1a0e08" strokeOpacity="0.30" strokeLinecap="round" fill="none" filter="url(#rough)">
          <path d="M 482 540 C 480 620, 481 700, 476 800" strokeWidth="0.9" />
          <path d="M 495 480 C 494 580, 495 700, 491 820" strokeWidth="0.8" />
          <path d="M 508 480 C 510 580, 510 700, 514 820" strokeWidth="0.8" />
          <path d="M 521 540 C 524 620, 525 700, 530 800" strokeWidth="0.9" />
        </g>
      </g>

      {/* MAIN BRANCHES — three boughs, slimmer than before */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" className="branches">
        <path d={`M ${FORK_LEFT.x} ${FORK_LEFT.y} C 430 480, 350 420, 230 380`} strokeWidth="14" />
        <path d={`M ${FORK_CENTER.x} ${FORK_CENTER.y} C 500 380, 502 270, 504 180`} strokeWidth="13" />
        <path d={`M ${FORK_RIGHT.x} ${FORK_RIGHT.y} C 570 480, 660 420, 790 380`} strokeWidth="14" />

        <path d="M 340 410 C 270 380, 180 350, 110 320" strokeWidth="6.5" />
        <path d="M 320 415 C 250 370, 190 320, 160 240" strokeWidth="6" />
        <path d="M 400 395 C 360 350, 320 290, 305 220" strokeWidth="5.5" />

        <path d="M 498 350 C 470 290, 440 220, 420 130" strokeWidth="6" />
        <path d="M 502 350 C 530 290, 560 220, 580 130" strokeWidth="6" />
        <path d="M 504 220 C 500 170, 500 120, 503 80" strokeWidth="5.5" />

        <path d="M 660 410 C 730 380, 810 350, 890 320" strokeWidth="6.5" />
        <path d="M 690 415 C 740 370, 800 320, 830 240" strokeWidth="6" />
        <path d="M 610 395 C 650 350, 680 290, 695 220" strokeWidth="5.5" />
      </g>

      {/* Twigs to each leaf */}
      <g filter="url(#rough)" fill="none" stroke="url(#branchGradient)" strokeLinecap="round" strokeWidth="2">
        {projects.map((project, i) => {
          const pos = LEAF_POSITIONS[i % LEAF_POSITIONS.length]
          const fork = forkFor(i)
          const angle = Math.atan2(pos.y - fork.y, pos.x - fork.x)
          const tipX = pos.x - Math.cos(angle) * 6
          const tipY = pos.y - Math.sin(angle) * 6
          return <path key={`twig-${project.id}`} d={branchPath(fork.x, fork.y, tipX, tipY)} />
        })}
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
              onDisturb={handleDisturb}
            />
          )
        })}
      </g>

      {/* BIRDS — flying off when the user touches a leaf */}
      <Bird x={300} y={395} kind="perched" scale={1.0} delay={0} duration={3} disturbCount={disturbCount} flyAwayX={-90} flyAwayY={-110} />
      <Bird x={780} y={150} kind="flying" scale={1.0} delay={0} duration={18} disturbCount={disturbCount} flyAwayX={140} flyAwayY={-140} />
      <Bird x={200} y={120} kind="flying" scale={0.85} delay={6} duration={22} disturbCount={disturbCount} flyAwayX={-160} flyAwayY={-160} />
    </svg>
  )
}
