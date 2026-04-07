// Sputnik clock for Übersicht (React/JSX).

// 120 Hz
export const refreshFrequency = 1000 / 120
export const label = "Sputnik Clock"
export const icon = "🛰️"
export const command = "date +%s"

export const className = `
bottom: 370px;
  right: 790px;
  width: 320px;
  height: 320px;
  pointer-events: none;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  border: none !important;
  outline: none !important;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-radius: 0 !important;
`

const CX = 160, CY = 160, R = 148
const MIN_ORBIT_R_OUT = R - 3
const MIN_ORBIT_R_IN = R - 11
const HOUR_ORBIT_R_OUT = 118
const HOUR_ORBIT_R_IN = 110
const HOUR_ORBIT_R_THROUGH = (HOUR_ORBIT_R_OUT + HOUR_ORBIT_R_IN) / 2
const HOUR_LABEL_R = HOUR_ORBIT_R_OUT + 8

function pt(deg, r) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r }
}

function handPath(cDeg, len, tail, w) {
  const rad = (cDeg - 90) * Math.PI / 180
  const fx = Math.cos(rad), fy = Math.sin(rad)
  const ex = -fy, ey = fx
  const tip  = { x: CX + fx * len,  y: CY + fy * len }
  const base = { x: CX - fx * tail, y: CY - fy * tail }
  const l    = { x: CX + ex * w,    y: CY + ey * w }
  const r2   = { x: CX - ex * w,    y: CY - ey * w }
  return { d: `M${tip.x},${tip.y} L${l.x},${l.y} L${base.x},${base.y} L${r2.x},${r2.y}Z`, tip, fx, fy }
}

export const render = () => {
  const now = new Date()
  const sFrac = now.getSeconds() + now.getMilliseconds() / 1000
  const m = now.getMinutes() + sFrac / 60
  const h = now.getHours() + m / 60
  const hDeg = ((h - 12 + 24) % 24) * 15
  const mDeg = (m / 60) * 360
  const sDeg = (sFrac / 60) * 360

  const hh = handPath(hDeg, HOUR_ORBIT_R_OUT, 16, 5.5)
  const mh = handPath(mDeg, MIN_ORBIT_R_OUT, 12, 4)
  const sr = (sDeg - 90) * Math.PI / 180

  const arcR = R - 45
  const pAL = pt(220, arcR)
  const pAR = pt(140, arcR)
  const arcD = `M${pAL.x.toFixed(2)},${pAL.y.toFixed(2)} A${arcR},${arcR} 0 0,0 ${pAR.x.toFixed(2)},${pAR.y.toFixed(2)}`

  const HOUR_LABEL_FS = 8.5

  const ticks = []
  for (let i = 1; i <= 24; i++) {
    const cDeg = ((i - 12 + 24) % 24) * 15
    const pin = pt(cDeg, HOUR_ORBIT_R_IN)
    const pout = pt(cDeg, HOUR_ORBIT_R_OUT)
    ticks.push(
      <line key={`tick-${i}`} x1={pin.x} y1={pin.y} x2={pout.x} y2={pout.y}
        stroke="#444" strokeWidth="1" strokeLinecap="round" />
    )
    const lp = pt(cDeg, HOUR_LABEL_R)
    const inTop = lp.y < CY
    if (i === 6 || i === 18) {
      ticks.push(
        <text key={`bot-${i}`} x={lp.x} y={lp.y} fill="#eee" fontSize={HOUR_LABEL_FS} fontWeight="400"
          textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif"
          clipPath="url(#cBot)">{i}</text>
      )
      ticks.push(
        <text key={`top-${i}`} x={lp.x} y={lp.y} fill="#111" fontSize={HOUR_LABEL_FS} fontWeight="400"
          textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif"
          clipPath="url(#cTop)">{i}</text>
      )
    } else {
      ticks.push(
        <text key={`label-${i}`} x={lp.x} y={lp.y}
          fill={inTop ? '#111' : '#eee'}
          fontSize={HOUR_LABEL_FS}
          fontWeight="400" textAnchor="middle" dominantBaseline="central"
          fontFamily="Arial, sans-serif">{i}</text>
      )
    }
  }

  const spY = CY - R * 0.50
  const antennae = [-55, -22, 22, 55].map((a) => {
    const rad = (a + 90) * Math.PI / 180
    return (
      <line key={`ant-${a}`}
        x1={CX + Math.cos(rad) * 4.9}
        y1={spY + Math.sin(rad) * 4.9}
        x2={CX + Math.cos(rad) * 15}
        y2={spY + Math.sin(rad) * 20}
        stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
    )
  })

  const minuteOrbit = []
  for (let mm = 0; mm < 60; mm++) {
    const deg = mm * 6
    const pin = pt(deg, MIN_ORBIT_R_IN)
    const pout = pt(deg, MIN_ORBIT_R_OUT)
    const isFive = mm % 5 === 0
    minuteOrbit.push(
      <line key={`min-${mm}`}
        x1={pin.x} y1={pin.y} x2={pout.x} y2={pout.y}
        stroke="#5a5a5a" strokeWidth={isFive ? 1.15 : 0.75} strokeLinecap="round" />
    )
  }

  return (
    <svg width="320" height="320" viewBox="0 0 320 320" overflow="hidden" style={{ overflow: 'hidden' }}>
      <defs>
        <clipPath id="cTop"><rect x="0" y="0" width="320" height={CY} /></clipPath>
        <clipPath id="cBot"><rect x="0" y={CY} width="320" height={CY} /></clipPath>
        <clipPath id="sputnikFace"><circle cx={CX} cy={CY} r={R + 1} /></clipPath>
        <path id="uarc" d={arcD} fill="none" />
      </defs>

      <g clipPath="url(#sputnikFace)">
      <circle cx={CX} cy={CY} r={R} fill="#f0ede8" clipPath="url(#cTop)" />
      <circle cx={CX} cy={CY} r={R} fill="#111" clipPath="url(#cBot)" />
      <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="#777" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#555" strokeWidth="1.5" />

      <circle cx={CX} cy={CY} r={MIN_ORBIT_R_OUT} fill="none" stroke="#6a6a6a" strokeWidth="0.9" />
      <circle cx={CX} cy={CY} r={MIN_ORBIT_R_IN} fill="none" stroke="#6a6a6a" strokeWidth="0.9" />
      {minuteOrbit}

      <text fill="#bbb" fontSize="7.8" fontWeight="700" fontFamily="Arial Narrow, Arial, sans-serif" letterSpacing="2.5">
        <textPath href="#uarc" startOffset="50%" textAnchor="middle">✦ MADE IN USSR ✦</textPath>
      </text>

      <text x={CX - R * 0.5} y={CY - 15} fill="#333" fontSize="9" fontWeight="700" letterSpacing="2"
        textAnchor="middle" dominantBaseline="central" fontFamily="Arial Narrow, Arial, sans-serif">DAY</text>
      <text x={CX - R * 0.5} y={CY + 15} fill="#ddd" fontSize="9" fontWeight="700" letterSpacing="2"
        textAnchor="middle" dominantBaseline="central" fontFamily="Arial Narrow, Arial, sans-serif">NIGHT</text>

      <g transform={`rotate(-35 ${CX} ${spY})`}>
        <circle cx={CX} cy={spY} r="7" fill="#1a1a1a" />
        {antennae}
      </g>
      <text x={CX} y={spY + 44} fill="#1a1a1a" fontSize="8" fontWeight="600"
        textAnchor="middle" dominantBaseline="central" fontFamily="Arial Narrow, Arial, sans-serif" letterSpacing="1">1957</text>
      <text x={CX} y={spY + 34} fill="#1a1a1a" fontSize="7" fontWeight="700"
        textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif" letterSpacing="1.5">SPUTNIK</text>

      {ticks}

      <circle cx={CX} cy={CY} r={HOUR_ORBIT_R_THROUGH} fill="none" stroke="#8c8c8c" strokeWidth="0.9" opacity="0.95" />

      <path d={mh.d} fill="#FFD700" stroke="#1c1810" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" paintOrder="stroke fill" />
      <path d={hh.d} fill="#8b0000" stroke="#140505" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" paintOrder="stroke fill" />
      <path d={`M${CX + Math.cos(sr) * MIN_ORBIT_R_OUT},${CY + Math.sin(sr) * MIN_ORBIT_R_OUT} L${CX - Math.cos(sr) * 20},${CY - Math.sin(sr) * 20}`}
        stroke="#cc3300" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      
      <circle cx={CX} cy={CY} r="5.5" fill="#222" />
      <circle cx={CX} cy={CY} r="2.5" fill="#cc3300" />
      </g>
    </svg>
  )
}
