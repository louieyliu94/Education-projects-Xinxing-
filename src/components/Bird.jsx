import React, { useEffect, useRef, useState } from 'react'

const INK = '#1B2A6B'
const INK_DEEP = '#0E1742'
const INK_SOFT = '#5d86b4'
const BEAK = '#C8412B'

// Sketched watercolor bird, in two variants. Hovering the bird sends it
// flying off (in addition to the leaf-driven disturbance from Tree).
export default function Bird({
  x = 0,
  y = 0,
  scale = 1,
  kind = 'flying',
  delay = 0,
  duration = 16,
  flyAwayX = 80,
  flyAwayY = -120,
  disturbCount = 0
}) {
  const [startled, setStartled] = useState(false)
  const timerRef = useRef(null)

  const triggerStartle = () => {
    setStartled(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStartled(false), 4200)
  }

  // External disturbance (any leaf hover/click in Tree)
  useEffect(() => {
    if (disturbCount === 0) return
    triggerStartle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disturbCount])

  // Cleanup
  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), [])

  const cls = [
    'bird',
    kind === 'flying' ? 'bird-flying' : 'bird-perched',
    startled ? 'bird-startled' : ''
  ].join(' ')

  return (
    <svg
      x={x - 28}
      y={y - 22}
      width="56"
      height="44"
      overflow="visible"
      className={cls}
      style={{
        animationDelay: startled ? '0s' : `${delay}s`,
        animationDuration: startled ? '4.2s' : `${duration}s`,
        '--fly-away-x': `${flyAwayX}px`,
        '--fly-away-y': `${flyAwayY}px`
      }}
      onMouseEnter={triggerStartle}
    >
      <g transform={`translate(28 22) scale(${scale})`} pointerEvents="visiblePainted">
        {kind === 'perched' ? <PerchedBird /> : <FlyingBird />}
      </g>
    </svg>
  )
}

function PerchedBird() {
  return (
    <g>
      {/* Soft underwash — a watercolor halo around the bird */}
      <ellipse cx="0" cy="0" rx="11" ry="8" fill={INK_SOFT} opacity="0.32" filter="url(#watercolor-strong)" />

      {/* Body — single brushstroke, slightly upward-leaning oval */}
      <path
        d="M -9 2
           C -11 -3, -8 -7, -2 -8
           C 4 -8, 9 -5, 9 0
           C 9 5, 4 7, -2 7
           C -7 7, -9 5, -9 2 Z"
        fill={INK}
        opacity="0.85"
        filter="url(#watercolor)"
      />

      {/* Head — distinct, sitting slightly above and forward of the body */}
      <circle cx="6" cy="-6" r="4" fill={INK} opacity="0.95" filter="url(#watercolor)" />

      {/* Beak — pointed red triangle */}
      <path d="M 9.5 -5.5 L 13 -5 L 9.5 -4 Z" fill={BEAK} />

      {/* Eye — dot of light */}
      <circle cx="7.5" cy="-7" r="0.9" fill="#FFFEF6" />
      <circle cx="7.7" cy="-6.9" r="0.4" fill={INK_DEEP} />

      {/* Folded wing — distinct shape over the body */}
      <path
        className="bird-wing-tucked"
        d="M -3 -3
           C 1 -7, 7 -6, 7 -1
           C 4 0, -1 1, -3 -3 Z"
        fill={INK_DEEP}
        opacity="0.88"
        filter="url(#watercolor)"
      />
      {/* Wing edge highlight */}
      <path
        d="M -3 -3 Q 2 -2, 7 -1"
        stroke="#FFFEF6"
        strokeOpacity="0.25"
        strokeWidth="0.5"
        fill="none"
      />

      {/* Tail — three feather strokes */}
      <g stroke={INK} strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M -8 0  L -15 -2" strokeWidth="1.4" />
        <path d="M -8 1  L -16 1"  strokeWidth="1.3" />
        <path d="M -8 2  L -15 4"  strokeWidth="1.4" />
      </g>

      {/* Legs */}
      <g stroke="#2a1810" strokeLinecap="round" fill="none">
        <path d="M -1 6 L -1 12" strokeWidth="0.9" />
        <path d="M  3 6 L  3 12" strokeWidth="0.9" />
        {/* Feet — small horizontal ticks */}
        <path d="M -3 12 L 1 12" strokeWidth="0.8" />
        <path d="M  1 12 L  5 12" strokeWidth="0.8" />
      </g>
    </g>
  )
}

function FlyingBird() {
  return (
    <g>
      {/* Wings — single graceful stroke covering both, slight downward-tip */}
      <path
        className="bird-wings"
        d="M -18 2 Q -10 -10, -3 -3 Q 3 -10, 18 2"
        stroke={INK}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body wash — small ellipse beneath the wings */}
      <ellipse cx="0" cy="-1.5" rx="3.2" ry="1.4" fill={INK} opacity="0.9" filter="url(#watercolor)" />
      {/* Head */}
      <circle cx="3" cy="-2.5" r="1.4" fill={INK} />
      {/* Beak */}
      <path d="M 4.4 -2.5 L 7 -2 L 4.4 -1.6 Z" fill={BEAK} />
      {/* Tail feathers */}
      <g stroke={INK} strokeWidth="0.8" strokeLinecap="round" fill="none">
        <path d="M -3.2 -1.5 L -6 -2.6" />
        <path d="M -3.2 -1.5 L -6 -1.2" />
        <path d="M -3.2 -1.5 L -6 0" />
      </g>
    </g>
  )
}
