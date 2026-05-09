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
  // Slim, songbird proportions: long oval body that leans up, small head,
  // longer tail than wing. All strokes kept light to read as brushwork.
  return (
    <g>
      {/* Soft underwash — narrower halo */}
      <ellipse cx="-1" cy="0" rx="9" ry="5" fill={INK_SOFT} opacity="0.28" filter="url(#watercolor-strong)" transform="rotate(-12)" />

      {/* Body — slim elongated oval, leaning up toward the head */}
      <g transform="rotate(-14)">
        <ellipse cx="0" cy="0" rx="8" ry="4.2" fill={INK} opacity="0.82" filter="url(#watercolor)" />
        {/* Belly highlight */}
        <ellipse cx="-1" cy="1.2" rx="5" ry="1.6" fill={INK_SOFT} opacity="0.45" filter="url(#watercolor)" />
      </g>

      {/* Head — small, sits forward and above */}
      <circle cx="6" cy="-5" r="3.2" fill={INK} opacity="0.92" filter="url(#watercolor)" />

      {/* Beak — pointed red */}
      <path d="M 8.8 -5 L 12 -4.6 L 8.8 -3.6 Z" fill={BEAK} />

      {/* Eye */}
      <circle cx="7" cy="-5.6" r="0.7" fill="#FFFEF6" />
      <circle cx="7.1" cy="-5.5" r="0.32" fill={INK_DEEP} />

      {/* Folded wing — long thin sweep along the back */}
      <path
        className="bird-wing-tucked"
        d="M -2 -3 C 2 -6, 6 -5, 6 -1.5 C 3 -1, -1 -1, -2 -3 Z"
        fill={INK_DEEP}
        opacity="0.82"
        filter="url(#watercolor)"
      />
      <path
        d="M -2 -3 Q 2 -2.2, 6 -1.5"
        stroke="#FFFEF6"
        strokeOpacity="0.22"
        strokeWidth="0.4"
        fill="none"
      />

      {/* Tail — long graceful feathers, slightly fanned */}
      <g stroke={INK} strokeLinecap="round" fill="none" opacity="0.88">
        <path d="M -7 -0.5 L -16 -3"  strokeWidth="1.1" />
        <path d="M -7  0.5 L -17  0.5" strokeWidth="1.1" />
        <path d="M -7  1.5 L -16  4"  strokeWidth="1.1" />
      </g>

      {/* Legs — thinner */}
      <g stroke="#2a1810" strokeLinecap="round" fill="none">
        <path d="M -1 4 L -1 11" strokeWidth="0.7" />
        <path d="M  3 4 L  3 11" strokeWidth="0.7" />
        <path d="M -3 11 L 1 11" strokeWidth="0.6" />
        <path d="M  1 11 L 5 11" strokeWidth="0.6" />
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
