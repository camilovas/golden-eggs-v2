export default function SolNegroMark({ size = 32 }) {
  const s = size, cx = s / 2, cy = s / 2
  const r = s * 0.46, rInner = s * 0.19, rayLen = s * 0.06
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#D9A441" strokeWidth={s * 0.009} opacity="0.9"/>
      <g stroke="#D9A441" strokeWidth={s * 0.012} strokeLinecap="round">
        <line x1={cx} y1={s * 0.016} x2={cx} y2={s * 0.016 + rayLen}/>
        <line x1={cx} y1={s * 0.984 - rayLen} x2={cx} y2={s * 0.984}/>
        <line x1={s * 0.016} y1={cy} x2={s * 0.016 + rayLen} y2={cy}/>
        <line x1={s * 0.984 - rayLen} y1={cy} x2={s * 0.984} y2={cy}/>
        <line x1={s * 0.157} y1={s * 0.157} x2={s * 0.157 + rayLen * 0.7} y2={s * 0.157 + rayLen * 0.7}/>
        <line x1={s * 0.807} y1={s * 0.807} x2={s * 0.807 + rayLen * 0.7} y2={s * 0.807 + rayLen * 0.7}/>
        <line x1={s * 0.807} y1={s * 0.157} x2={s * 0.807 + rayLen * 0.7} y2={s * 0.157 - rayLen * 0.7}/>
        <line x1={s * 0.157} y1={s * 0.843 - rayLen * 0.7} x2={s * 0.157 + rayLen * 0.7} y2={s * 0.843}/>
      </g>
      <circle cx={cx} cy={cy} r={rInner} fill="#0A0705"/>
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#FFD37A" strokeWidth={s * 0.007}/>
    </svg>
  )
}
