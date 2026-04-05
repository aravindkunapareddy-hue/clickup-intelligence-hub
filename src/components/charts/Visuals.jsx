import React, { useEffect, useMemo, useState } from 'react'

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  }
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ')
}

function describeLine(points) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
}

function describeArea(points, baseline) {
  const line = describeLine(points)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`
}

function getTooltipPosition(event, container) {
  const rect = container.getBoundingClientRect()
  return { x: event.clientX - rect.left + 12, y: event.clientY - rect.top + 12 }
}

export function ScoreDial({ score }) {
  const [displayScore, setDisplayScore] = useState(0)
  const center = { x: 100, y: 100 }
  const radius = 74
  const needleAngle = -90 + (Math.max(0, Math.min(score, 100)) / 100) * 180

  useEffect(() => {
    let frameId
    let start
    const duration = 1000

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(score * eased))
      if (progress < 1) frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [score])

  const tickMarks = Array.from({ length: 11 }, (_, index) => {
    const angle = -90 + index * 18
    const outer = polarToCartesian(center.x, center.y, 82, angle)
    const inner = polarToCartesian(center.x, center.y, 76, angle)
    return { outer, inner }
  })

  return (
    <div className="score-dial-wrap">
      <svg viewBox="0 0 200 122" className="score-dial" role="img" aria-label={`Intent score ${score} out of 100`}>
        <defs>
          <filter id="dialShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
          </filter>
        </defs>

        <path d={describeArc(100, 100, radius, -90, 90)} className="score-dial-track" />
        <path d={describeArc(100, 100, radius, -90, -30)} stroke="#6B7280" className="score-dial-zone" />
        <path d={describeArc(100, 100, radius, -30, 30)} stroke="#F59E0B" className="score-dial-zone" />
        <path d={describeArc(100, 100, radius, 30, 90)} stroke="#EF4444" className="score-dial-zone" />

        {tickMarks.map((tick, index) => (
          <line
            key={`tick-${index}`}
            x1={tick.inner.x}
            y1={tick.inner.y}
            x2={tick.outer.x}
            y2={tick.outer.y}
            className="score-dial-tick"
          />
        ))}

        <g
          className="score-dial-needle"
          style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '100px 100px' }}
          filter="url(#dialShadow)"
        >
          <line x1="100" y1="100" x2="100" y2="28" className="score-dial-needle-line" />
        </g>
        <circle cx="100" cy="100" r="8" className="score-dial-pivot" />
      </svg>

      <div className="score-dial-readout">
        <div className="score-dial-number">{displayScore}</div>
        <div className="score-dial-suffix">/100</div>
      </div>

      <div className="score-dial-labels">
        <span>COLD</span>
        <span>WARM</span>
        <span>HOT</span>
      </div>
    </div>
  )
}

export function IntentSparkline({ values }) {
  const width = 120
  const height = 40
  const padding = 4
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values.map((value, index) => ({
    x: padding + (index / (values.length - 1)) * (width - padding * 2),
    y: height - padding - ((value - min) / Math.max(max - min, 1)) * (height - padding * 2),
  }))
  const last = points[points.length - 1]

  return (
    <div className="sparkline-card">
      <svg viewBox={`0 0 ${width} ${height}`} className="sparkline-svg" aria-hidden="true">
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(54,184,245,0.28)" />
            <stop offset="100%" stopColor="rgba(54,184,245,0)" />
          </linearGradient>
        </defs>
        <path d={describeArea(points, height - 2)} fill="url(#sparkGradient)" />
        <path d={describeLine(points)} fill="none" stroke="#36B8F5" strokeWidth="2" />
        {points.map((point, index) => (
          <g key={`spark-${index}`}>
            <circle cx={point.x} cy={point.y} r={index === points.length - 1 ? 3 : 2} fill="#36B8F5" />
            <circle cx={point.x} cy={point.y} r={index === points.length - 1 ? 6 : 3} className={index === points.length - 1 ? 'sparkline-pulse' : 'sparkline-dot'} />
          </g>
        ))}
      </svg>
      <div className="sparkline-label">7-day engagement</div>
    </div>
  )
}

export function SignalHistogram({ data }) {
  const height = 240
  const labelWidth = 140
  const chartWidth = 520
  const barHeight = 28
  const rowGap = 12
  const maxPoints = 35
  const width = labelWidth + chartWidth + 120
  const rows = data.map((item, index) => {
    const y = 16 + index * (barHeight + rowGap)
    const barWidth = (Math.min(item.points, maxPoints) / maxPoints) * chartWidth
    return { ...item, y, barWidth }
  })
  const [tooltip, setTooltip] = useState(null)

  return (
    <div className="visual-card chart-card signal-distribution-card">
      <div className="card-header">
        <div className="card-icon-box card-icon-box--purple">📶</div>
        <div className="card-title">Signal Distribution</div>
      </div>
      <div className="card-body chart-card-body">
        <div className="svg-tooltip-wrap">
          <svg viewBox={`0 0 ${width} ${height}`} className="signal-histogram">
            {[0, 10, 20, 30].map((tick) => {
              const x = labelWidth + (tick / maxPoints) * chartWidth
              return (
                <g key={`grid-${tick}`}>
                  <line x1={x} y1="6" x2={x} y2={height - 26} className="signal-grid-line" />
                  <text x={x} y={height - 8} className="signal-grid-label">
                    {tick}
                  </text>
                </g>
              )
            })}

            <defs>
              <linearGradient id="histogramHigh" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7B68EE" />
                <stop offset="100%" stopColor="#36B8F5" />
              </linearGradient>
              <linearGradient id="histogramMed" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
            </defs>

            {rows.map((row, index) => {
              const labelX = labelWidth - 12
              const barX = labelWidth
              const pointsInside = row.barWidth > chartWidth * 0.6
              const tier = row.points >= 20 ? 'HIGH' : row.points >= 10 ? 'MED' : 'LOW'
              const fill = row.points >= 20 ? 'url(#histogramHigh)' : row.points >= 10 ? 'url(#histogramMed)' : '#D1D5DB'

              return (
                <g
                  key={row.id}
                  className="signal-histogram-row"
                  onMouseMove={(event) =>
                    setTooltip({
                      x: event.nativeEvent.offsetX + 16,
                      y: event.nativeEvent.offsetY + 8,
                      title: row.label,
                      body: `${row.points} points · ${row.insight}`,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                >
                  <text x={labelX} y={row.y + 18} className="signal-label">
                    {row.label}
                  </text>
                  <rect x={barX} y={row.y} width={chartWidth} height={barHeight} rx="4" className="signal-track" />
                  <rect
                    x={barX}
                    y={row.y}
                    width={row.barWidth}
                    height={barHeight}
                    rx="4"
                    fill={fill}
                    className="signal-fill"
                    style={{ animationDelay: `${index * 80}ms` }}
                  />
                  <text
                    x={pointsInside ? barX + row.barWidth - 10 : barX + row.barWidth + 8}
                    y={row.y + 18}
                    textAnchor={pointsInside ? 'end' : 'start'}
                    className={pointsInside ? 'signal-points signal-points--inside' : 'signal-points'}
                  >
                    +{row.points}
                  </text>
                  <foreignObject x={labelWidth + chartWidth + 10} y={row.y + 4} width="52" height="20">
                    <div className={`impact-pill impact-pill--${tier.toLowerCase()}`}>{tier}</div>
                  </foreignObject>
                </g>
              )
            })}
          </svg>
          {tooltip && (
            <div className="chart-tooltip chart-tooltip--dark" style={{ left: tooltip.x, top: tooltip.y }}>
              <div className="chart-tooltip-title">{tooltip.title}</div>
              <div className="chart-tooltip-copy">{tooltip.body}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function TopicDonut({ clusters }) {
  const [active, setActive] = useState(clusters[0])
  const radius = 52
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="topic-donut-wrap">
      <div className="svg-tooltip-wrap">
        <svg viewBox="0 0 160 160" className="topic-donut">
          <g transform="translate(80,80)">
            {clusters.map((cluster, index) => {
              const dash = (cluster.value / 100) * circumference
              const segment = (
                <circle
                  key={cluster.label}
                  r={radius}
                  cx="0"
                  cy="0"
                  fill="transparent"
                  stroke={cluster.color}
                  strokeWidth="28"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  className="topic-donut-segment"
                  style={{ animationDelay: `${index * 150}ms` }}
                  transform="rotate(-90)"
                  onMouseEnter={() => setActive(cluster)}
                />
              )
              offset += dash + 3
              return segment
            })}
          </g>
          <text x="80" y="68" textAnchor="middle" className="donut-center-label">
            Primary
          </text>
          <text x="80" y="88" textAnchor="middle" className="donut-center-topic">
            {active.label}
          </text>
          <text x="80" y="108" textAnchor="middle" className="donut-center-value">
            {active.value}%
          </text>
        </svg>
      </div>
      <div className="topic-donut-legend">
        {clusters.map((cluster) => (
          <div key={cluster.label} className="topic-legend-item" onMouseEnter={() => setActive(cluster)}>
            <span className="topic-legend-dot" style={{ background: cluster.color }} />
            <span className="topic-legend-label">{cluster.label}</span>
            <span className="topic-legend-value">{cluster.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BuyerRadar({ values, benchmark }) {
  const size = 280
  const center = size / 2
  const radius = 92
  const angleStep = (Math.PI * 2) / values.length

  const polygonPoints = (dataset) =>
    dataset
      .map((item, index) => {
        const angle = -Math.PI / 2 + index * angleStep
        const scale = item.value / 100
        const x = center + Math.cos(angle) * radius * scale
        const y = center + Math.sin(angle) * radius * scale
        return `${x},${y}`
      })
      .join(' ')

  const gridPolygons = [0.25, 0.5, 0.75, 1].map((step) =>
    values
      .map((_, index) => {
        const angle = -Math.PI / 2 + index * angleStep
        const x = center + Math.cos(angle) * radius * step
        const y = center + Math.sin(angle) * radius * step
        return `${x},${y}`
      })
      .join(' '),
  )

  return (
    <div className="radar-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg">
        {gridPolygons.map((points, index) => (
          <polygon key={`grid-${index}`} points={points} className="radar-grid" />
        ))}

        {values.map((item, index) => {
          const angle = -Math.PI / 2 + index * angleStep
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          const labelX = center + Math.cos(angle) * (radius + 20)
          const labelY = center + Math.sin(angle) * (radius + 20)
          return (
            <g key={item.label}>
              <line x1={center} y1={center} x2={x} y2={y} className="radar-axis" />
              <text x={labelX} y={labelY} textAnchor="middle" className="radar-label">
                {item.label}
              </text>
            </g>
          )
        })}

        <polygon points={polygonPoints(benchmark)} className="radar-benchmark" />
        <polygon points={polygonPoints(values)} className="radar-shape" />
        {values.map((item, index) => {
          const angle = -Math.PI / 2 + index * angleStep
          const x = center + Math.cos(angle) * radius * (item.value / 100)
          const y = center + Math.sin(angle) * radius * (item.value / 100)
          return <circle key={`dot-${item.label}`} cx={x} cy={y} r="4" className="radar-dot" />
        })}
      </svg>
      <div className="radar-legend">
        <span className="radar-legend-chip"><span className="radar-swatch radar-swatch--lead" />Your lead</span>
        <span className="radar-legend-chip"><span className="radar-swatch radar-swatch--avg" />Avg warm lead</span>
      </div>
    </div>
  )
}

export function AttributionWaterfall({ nodes }) {
  return (
    <div className="waterfall-wrap">
      <svg viewBox={`0 0 ${Math.max(980, nodes.length * 176)} 180`} className="waterfall-svg">
        {nodes.map((node, index) => {
          const x = 24 + index * 176
          const isFinal = index === nodes.length - 1
          const nextX = x + 140
          const arrowX = nextX + 8
          return (
            <g key={node.title}>
              <foreignObject x={x + 32} y="8" width="62" height="22">
                <div className={`impact-pill impact-pill--${node.impact.toLowerCase()}`}>{node.impact}</div>
              </foreignObject>
              <line x1={x + 62} y1="30" x2={x + 62} y2="54" className="waterfall-impact-line" />
              <rect
                x={x}
                y="56"
                width="140"
                height="36"
                rx="18"
                fill={isFinal ? '#7B68EE' : `${node.color}1F`}
                stroke={isFinal ? '#7B68EE' : node.color}
                className={isFinal ? 'waterfall-node waterfall-node--final' : 'waterfall-node'}
              />
              <text x={x + 70} y="78" textAnchor="middle" className={isFinal ? 'waterfall-node-text waterfall-node-text--final' : 'waterfall-node-text'}>
                {isFinal ? 'Trial Start' : node.title}
              </text>
              <text x={x + 70} y="110" textAnchor="middle" className="waterfall-day-label">
                {node.day}
              </text>
              {!isFinal && (
                <g>
                  <path
                    d={`M ${nextX} 74 C ${nextX + 18} 74, ${arrowX - 18} 74, ${arrowX} 74`}
                    className="waterfall-arrow"
                    style={{ animationDelay: `${index * 120}ms` }}
                  />
                  <path d={`M ${arrowX} 74 l -8 -4 l 0 8 Z`} className="waterfall-arrow-head" />
                </g>
              )}
            </g>
          )
        })}
      </svg>
      <div className="waterfall-summary">
        {nodes.length - 1} pieces over {Math.max(7, (nodes.length - 1) * 4)} days contributed to this contact&apos;s intent.
      </div>
    </div>
  )
}

export function DashboardHistogram({ data }) {
  const width = 360
  const height = 220
  const max = Math.max(...data.map((item) => item.count))
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="dashboard-histogram">
      {data.map((item, index) => {
        const barHeight = (item.count / max) * 140
        const x = 38 + index * 78
        const y = 170 - barHeight
        return (
          <g key={item.band} className="dashboard-bar-group">
            <rect x={x} y={y} width="60" height={barHeight} rx="8" fill={item.color} className="dashboard-bar" style={{ animationDelay: `${index * 80}ms` }} />
            <text x={x + 30} y="194" textAnchor="middle" className="dashboard-axis-label">
              {item.band}
            </text>
            <text x={x + 30} y={y - 8} textAnchor="middle" className="dashboard-bar-value">
              {item.count}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function SignalHeatmap({ signals, days, values }) {
  const [tooltip, setTooltip] = useState(null)
  const cellWidth = 58
  const cellHeight = 34
  const left = 118
  const top = 34
  const width = left + days.length * cellWidth + 16
  const height = top + signals.length * cellHeight + 12

  const colorFor = (value) => {
    if (value <= 10) return '#FFFFFF'
    if (value <= 30) return 'rgba(123,104,238,0.12)'
    if (value <= 50) return 'rgba(123,104,238,0.28)'
    if (value <= 70) return 'rgba(123,104,238,0.46)'
    return '#6554C0'
  }

  return (
    <div className="svg-tooltip-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="heatmap-svg">
        {days.map((day, col) => (
          <text key={day} x={left + col * cellWidth + 24} y="22" textAnchor="middle" className="heatmap-day-label">
            {day}
          </text>
        ))}
        {signals.map((signal, row) => (
          <text key={signal} x="0" y={top + row * cellHeight + 22} className="heatmap-row-label">
            {signal}
          </text>
        ))}
        {values.flatMap((rowValues, row) =>
          rowValues.map((value, col) => (
            <rect
              key={`${row}-${col}`}
              x={left + col * cellWidth}
              y={top + row * cellHeight}
              width="44"
              height="26"
              rx="8"
              fill={colorFor(value)}
              stroke="rgba(123,104,238,0.14)"
              onMouseMove={(event) =>
                setTooltip({
                  x: event.nativeEvent.offsetX + 16,
                  y: event.nativeEvent.offsetY + 8,
                  title: `${signals[row]} on ${days[col]}`,
                  body: `Converts at ${value}% for scored contacts.`,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />
          )),
        )}
      </svg>
      {tooltip && (
        <div className="chart-tooltip chart-tooltip--dark" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="chart-tooltip-title">{tooltip.title}</div>
          <div className="chart-tooltip-copy">{tooltip.body}</div>
        </div>
      )}
    </div>
  )
}

export function VelocityLineChart({ data }) {
  const width = 420
  const height = 220
  const padding = { top: 16, right: 18, bottom: 30, left: 24 }
  const max = Math.max(...data.map((item) => Math.max(item.hot, item.warm, item.avg)))
  const xFor = (index) => padding.left + (index / (data.length - 1)) * (width - padding.left - padding.right)
  const yFor = (value) => height - padding.bottom - (value / max) * (height - padding.top - padding.bottom)

  const series = [
    { key: 'hot', color: '#EF4444', fill: 'rgba(239,68,68,0.14)', dash: null },
    { key: 'warm', color: '#F59E0B', fill: 'rgba(245,158,11,0.12)', dash: null },
    { key: 'avg', color: '#7B68EE', fill: 'rgba(123,104,238,0.08)', dash: '6 6' },
  ]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="velocity-chart">
      {data.map((item, index) => (
        <text key={item.day} x={xFor(index)} y={height - 8} textAnchor="middle" className="dashboard-axis-label">
          {index % 2 === 0 ? item.day.replace('Day ', '') : ''}
        </text>
      ))}

      {series.map((seriesItem) => {
        const points = data.map((item, index) => ({ x: xFor(index), y: yFor(item[seriesItem.key]) }))
        return (
          <g key={seriesItem.key}>
            <path d={describeArea(points, height - padding.bottom)} fill={seriesItem.fill} className="velocity-area" />
            <path
              d={describeLine(points)}
              fill="none"
              stroke={seriesItem.color}
              strokeWidth="2.5"
              strokeDasharray={seriesItem.dash || undefined}
              className="velocity-line"
            />
          </g>
        )
      })}
    </svg>
  )
}

export function SignalMixDonut({ data }) {
  const [active, setActive] = useState(data[0])
  const radius = 48
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="signal-mix-wrap">
      <svg viewBox="0 0 160 160" className="topic-donut">
        <g transform="translate(80,80)">
          {data.map((item, index) => {
            const dash = (item.value / 100) * circumference
            const strokeDashoffset = -offset
            offset += dash + 3
            return (
              <circle
                key={item.label}
                r={radius}
                cx="0"
                cy="0"
                fill="transparent"
                stroke={item.color}
                strokeWidth="24"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={strokeDashoffset}
                className="topic-donut-segment"
                transform="rotate(-90)"
                onMouseEnter={() => setActive(item)}
              />
            )
          })}
        </g>
        <text x="80" y="70" textAnchor="middle" className="donut-center-label">
          Mix
        </text>
        <text x="80" y="90" textAnchor="middle" className="donut-center-topic">
          {active.label}
        </text>
        <text x="80" y="108" textAnchor="middle" className="donut-center-value">
          {active.value}%
        </text>
      </svg>
      <div className="topic-donut-legend">
        {data.map((item) => (
          <div key={item.label} className="topic-legend-item" onMouseEnter={() => setActive(item)}>
            <span className="topic-legend-dot" style={{ background: item.color }} />
            <span className="topic-legend-label">{item.label}</span>
            <span className="topic-legend-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
