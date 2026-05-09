import React, { useEffect, useState } from 'react'

// Royal blue — Xinxing's indigo from the school logo.
const INK = '#1B2A6B'
const INK_DEEP = '#0E1742'
const BEAK = '#C8412B'

// Sketched bird, drawn as a sequence of separate brush strokes the way a
// Chinese watercolor bird would be: a body wash, a head wash, beak, tail
// feathers, tucked wing, legs. Two variants: perched and flying.
//
// disturbCount: every change triggers a one-shot fly-away animation.
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

  useEffect(() => {
    if (disturbCount === 0) return
    setStartled(true)
    const t = setTimeout(() => setStartled(false), 4200)
    return () => clearTimeout(t)
  }, [disturbCount])

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
      pointerEvents="none"
    >
      <g transform={`translate(28 22) scale(${scale})`}>
        {kind === 'perched' ? (
          <PerchedBird />
        ) : (
          <FlyingBird />
        )}
      </g>
    </svg>
  )
}

function PerchedBird() {
  return (
    <g>
      {/* Body — a soft watercolor wash, oval angled slightly up */}
      <g transform="rotate(-8)">
        <ellipse cx="0" cy="0" rx="9" ry="5.5" fill={INK} opacity="0.85" filter="url(#watercolor)" />
        {/* Lighter belly highlight */}
        <ellipse cx="-1" cy="2" rx="6" ry="2.5" fill="#3a4f8e" opacity="0.5" filter="url(#watercolor)" />
      </g>

      {/* Head — separate stroke, slightly above and forward */}
      <circle cx="7" cy="-5" r="4" fill={INK} opacity="0.92" filter="url(#watercolor)" />

      {/* Beak — small red triangle, school-logo accent */}
      <path d="M 10 -4.5 L 14 -4 L 10 -3 Z" fill={BEAK} />

      {/* Eye — single white dot */}
      <circle cx="8" cy="-6" r="0.6" fill="#FFFEF6" />

      {/* Tail feathers — 3 brush strokes radiating back */}
      <g stroke={INK} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M -7 -1 L -14 -3" />
        <path d="M -7  0 L -15 0" />
        <path d="M -7  1 L -14 3" />
      </g>

      {/* Wing tucked along body — animates a tiny tuck/release */}
      <path
        className="bird-wing-tucked"
        d="M -2 -3 C 3 -7, 8 -5, 6 -1 C 1 0, -2 -1, -2 -3 Z"
        fill={INK_DEEP}
        opacity="0.85"
        filter="url(#watercolor)"
      />

      {/* Legs */}
      <g stroke="#2a1810" strokeWidth="0.9" strokeLinecap="round" fill="none">
        <path d="M -1 4 L -1 10" />
        <path d="M  3 4 L  3 10" />
        {/* Tiny feet */}
        <path d="M -2 10 L -1 10 L 0 10" />
        <path d="M  2 10 L  3 10 L 4 10" />
      </g>
    </g>
  )
}

function FlyingBird() {
  return (
    <g>
      {/* Wings — single graceful stroke covering both wings */}
      <path
        className="bird-wings"
        d="M -16 1 Q -8 -10, 0 -3 Q 8 -10, 16 1"
        stroke={INK}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body — small wash beneath the wings */}
      <ellipse cx="0" cy="-1.5" rx="3" ry="1.3" fill={INK} opacity="0.85" filter="url(#watercolor)" />
      {/* Head — small circle */}
      <circle cx="3" cy="-2.5" r="1.3" fill={INK} />
      {/* Beak */}
      <path d="M 4 -2.5 L 6 -2 L 4 -1.5 Z" fill={BEAK} />
      {/* Tail feathers */}
      <g stroke={INK} strokeWidth="0.9" strokeLinecap="round" fill="none">
        <path d="M -3 -1.5 L -6 -2.5" />
        <path d="M -3 -1.5 L -6 -1.2" />
        <path d="M -3 -1.5 L -6 0" />
      </g>
    </g>
  )
}
