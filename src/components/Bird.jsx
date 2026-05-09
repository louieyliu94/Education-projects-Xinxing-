import React, { useEffect, useState } from 'react'

// Folk-art bird, royal-blue ink silhouette. Two variants:
//   "perched"  — sits on a branch, gently bobs
//   "flying"   — drifts across the canopy with a flapping M-curve wing
//
// When `disturbCount` changes, the bird gets startled and flies off briefly
// before settling back into its idle motion.
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
    const t = setTimeout(() => setStartled(false), 2600)
    return () => clearTimeout(t)
  }, [disturbCount])

  const cls = [
    'bird',
    kind === 'flying' ? 'bird-flying' : 'bird-perched',
    startled ? 'bird-startled' : ''
  ].join(' ')

  return (
    <svg
      x={x - 24}
      y={y - 18}
      width="48"
      height="36"
      overflow="visible"
      className={cls}
      style={{
        animationDelay: startled ? '0s' : `${delay}s`,
        animationDuration: startled ? '2.6s' : `${duration}s`,
        '--fly-away-x': `${flyAwayX}px`,
        '--fly-away-y': `${flyAwayY}px`
      }}
      pointerEvents="none"
    >
      <g transform={`translate(24 18) scale(${scale})`}>
        {kind === 'flying' ? (
          <>
            {/* Iconic two-arc silhouette — M shape with a small body */}
            <path
              className="bird-wings"
              d="M -14 1 Q -7 -10, 0 -2 Q 7 -10, 14 1"
              stroke="#1B2A6B"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="0" cy="-1.5" rx="2.2" ry="1" fill="#1B2A6B" />
          </>
        ) : (
          <>
            {/* Perched silhouette — body, head, beak, tail, legs */}
            <path
              d="M -8 0
                 C -9 -3, -7 -6, -3 -7
                 C 1 -8, 5 -7, 7 -5
                 L 9 -4 L 11 -4 L 9 -3
                 C 5 -2, 0 -2, -3 -1
                 L -8 0 Z"
              fill="#1B2A6B"
              filter="url(#watercolor)"
            />
            {/* Tail */}
            <path
              d="M -8 0 L -13 -1 L -13 2 Z"
              fill="#1B2A6B"
              filter="url(#watercolor)"
            />
            {/* Eye */}
            <circle cx="6" cy="-5" r="0.8" fill="#FFFEF6" />
            {/* Beak highlight */}
            <path d="M 9 -4 L 11 -4 L 9 -3 Z" fill="#C8412B" />
            {/* Wing — flaps */}
            <path
              className="bird-wing-tucked"
              d="M -3 -3 C 1 -7, 5 -7, 5 -3 C 2 -2, -1 -2, -3 -3 Z"
              fill="#0E1742"
              filter="url(#watercolor)"
            />
            {/* Legs */}
            <g stroke="#2a1810" strokeWidth="0.9" strokeLinecap="round" fill="none">
              <path d="M -1 0 L -1 5" />
              <path d="M 3 0 L 3 5" />
            </g>
          </>
        )}
      </g>
    </svg>
  )
}
