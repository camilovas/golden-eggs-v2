export default function SolNegroMark({ size = 64 }) {
  const s = size
  // void center = 92/240 of original (38.3%)
  const voidSize = s * 0.383

  return (
    <div style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}>
      {/* Rotating ring — orfebrería precolombina completa */}
      <svg
        className="solnegro-ring"
        width={s}
        height={s}
        viewBox="0 0 240 240"
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Outer hammered gold ring (disco de acreción) */}
        <circle cx="120" cy="120" r="112" fill="none" stroke="#D9A441" strokeWidth="2" opacity="0.9"/>
        <circle cx="120" cy="120" r="104" fill="none" stroke="#C25E00" strokeWidth="1" opacity="0.5"/>

        {/* Orfebrería ray marks — sol disco precolombino */}
        <g stroke="#D9A441" strokeWidth="2.4" strokeLinecap="round">
          <line x1="120" y1="4"   x2="120" y2="16"/>
          <line x1="120" y1="224" x2="120" y2="236"/>
          <line x1="4"   y1="120" x2="16"  y2="120"/>
          <line x1="224" y1="120" x2="236" y2="120"/>
          <line x1="38"    y1="38"    x2="46.5" y2="46.5"/>
          <line x1="193.5" y1="193.5" x2="202"  y2="202"/>
          <line x1="193.5" y1="46.5"  x2="202"  y2="38"/>
          <line x1="38"    y1="202"   x2="46.5" y2="193.5"/>
        </g>

        {/* Repujado dots — golpes de mazo sobre metal */}
        <g fill="#D9A441">
          <circle cx="120"   cy="34"    r="2.6"/>
          <circle cx="180.8" cy="59.2"  r="2.6"/>
          <circle cx="206"   cy="120"   r="2.6"/>
          <circle cx="180.8" cy="180.8" r="2.6"/>
          <circle cx="120"   cy="206"   r="2.6"/>
          <circle cx="59.2"  cy="180.8" r="2.6"/>
          <circle cx="34"    cy="120"   r="2.6"/>
          <circle cx="59.2"  cy="59.2"  r="2.6"/>
        </g>

        {/* Inner accretion ring */}
        <circle cx="120" cy="120" r="72" fill="none" stroke="#FFD37A" strokeWidth="1.6" opacity="0.85"/>

        {/* Escalonado andino — patrón geométrico en 4 puntos cardinales */}
        <g stroke="#D9A441" strokeWidth="1.4" fill="none" opacity="0.8">
          <path d="M 120 52 l 6 0 l 0 6 l 6 0"/>
          <path d="M 188 120 l 0 6 l -6 0 l 0 6"/>
          <path d="M 120 188 l -6 0 l 0 -6 l -6 0"/>
          <path d="M 52 120 l 0 -6 l 6 0 l 0 -6"/>
        </g>
      </svg>

      {/* Static void — agujero negro, no rota */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: voidSize,
        height: voidSize,
        borderRadius: '50%',
        background: '#000',
        boxShadow: [
          `0 0 ${s * 0.167}px ${s * 0.025}px rgba(217,164,65,0.45)`,
          `0 0 ${s * 0.375}px ${s * 0.083}px rgba(194,94,0,0.18)`,
          `inset 0 0 ${s * 0.083}px rgba(0,0,0,1)`,
        ].join(', '),
      }} />
    </div>
  )
}
