// Hand-curated tip positions for leaves on the kapok tree.
// Each entry corresponds to a twig-tip drawn in Tree.jsx. Add more entries
// (and matching twig paths) as the school adds more student portfolios.
// rotate is in degrees; scale is a multiplier on the leaf's base size.

export const LEAF_POSITIONS = [
  // Far-left cluster
  { x: 90,  y: 320, rotate: -55, scale: 1.05 },
  { x: 130, y: 200, rotate: -35, scale: 1.0  },
  { x: 245, y: 260, rotate: -25, scale: 1.1  },

  // Upper-left canopy
  { x: 325, y: 205, rotate: -15, scale: 1.0  },
  { x: 380, y: 150, rotate:  -5, scale: 0.95 },

  // Center top — crown leaves
  { x: 425, y: 105, rotate:  -8, scale: 1.05 },
  { x: 505, y:  80, rotate:   0, scale: 1.15 },
  { x: 580, y: 105, rotate:   8, scale: 1.05 },

  // Upper-right canopy
  { x: 635, y: 150, rotate:   5, scale: 0.95 },
  { x: 675, y: 205, rotate:  15, scale: 1.0  },

  // Right cluster
  { x: 775, y: 270, rotate:  25, scale: 1.1  },
  { x: 865, y: 225, rotate:  35, scale: 1.0  },
  { x: 920, y: 320, rotate:  55, scale: 1.05 },

  // Lower side accents — drooping leaves
  { x: 200, y: 400, rotate: -45, scale: 0.95 },

  // ——— Spare slots for future portfolios (don't render until used) ———
  { x: 300, y: 360, rotate: -30, scale: 1.0  },
  { x: 480, y: 230, rotate: -10, scale: 0.9  },
  { x: 530, y: 230, rotate:  10, scale: 0.9  },
  { x: 700, y: 360, rotate:  30, scale: 1.0  },
  { x: 800, y: 480, rotate:  40, scale: 0.95 },
  { x: 200, y: 480, rotate: -40, scale: 0.95 },
  { x: 400, y: 350, rotate: -20, scale: 0.9  },
  { x: 600, y: 350, rotate:  20, scale: 0.9  },
  { x: 350, y: 280, rotate: -18, scale: 0.95 },
  { x: 650, y: 280, rotate:  18, scale: 0.95 }
]
