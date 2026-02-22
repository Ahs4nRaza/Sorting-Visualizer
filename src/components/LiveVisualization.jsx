import { useMemo, useState } from 'react'
import { Column } from '@ant-design/plots'
import { BAR_STATUS, BAR_COLORS } from '../constants/constants'

function LiveVisualization({ 
  array, 
  comparing = [], 
  sortedIndices = [],
  isSortingComplete = false
}) {
  const [showValues, setShowValues] = useState(false)
  const hasData = array && array.length > 0

  const data = useMemo(() => {
    if (!hasData) return []
    return array.map((value, i) => {
      let status = BAR_STATUS.DEFAULT
      if (isSortingComplete) {
        status = BAR_STATUS.SORTED
      } else {
        if (comparing.includes(i)) {
          status = BAR_STATUS.COMPARING
        } else if (sortedIndices.includes(i)) {
          status = BAR_STATUS.SORTED
        }
      }

      return {
        index: i + 1,
        value,
        status,
        category: status
      }
    })
  }, [array, comparing, hasData, sortedIndices, isSortingComplete])

  const config = useMemo(() => {
    return {
      data,
      autoFit: true,
      width: 1400,
      height: 360,
      xField: 'index',
      yField: 'value',
      colorField: 'status',
      scale: {
        color: {
          domain: [BAR_STATUS.DEFAULT, BAR_STATUS.COMPARING, BAR_STATUS.SORTED],
          range: [
            BAR_COLORS[BAR_STATUS.DEFAULT],
            BAR_COLORS[BAR_STATUS.COMPARING],
            BAR_COLORS[BAR_STATUS.SORTED]
          ]
        }
      },
      padding: [12, 16, 32, 40],
      xAxis: {
        title: null,
        label: null,
        tickLine: null
      },
      yAxis: {
        title: null
      },
      tooltip: false,
      legend: false,
      label: showValues
        ? {
            position: 'inside',
            style: { fill: '#000000', fontSize: 16, fontWeight: 400 }
          }
        : undefined,
      animation: false
    }
  }, [data, showValues])

  return (
    <div className="live-visualization">
      <div className="live-visualization__header">
        <h2 className="live-visualization__title">Live Visualization</h2>
        <label className="live-visualization__checkbox-label">
          <input 
            type="checkbox"
            className="live-visualization__checkbox"
            checked={showValues}
            onChange={(e) => setShowValues(e.target.checked)}
            disabled={!hasData}
          />
          <span>Show values</span>
        </label>
      </div>
      <div className="live-visualization__content">
        {!hasData ? (
          <div className="live-visualization__placeholder">
            Generate values to visualize sorting
          </div>
        ) : (
          <div className="live-visualization__chart">
            <Column {...config} />
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveVisualization
