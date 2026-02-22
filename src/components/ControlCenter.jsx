import { Tooltip } from 'antd'
import { 
  SORTING_ALGORITHMS, 
  ARRAY_SIZES, 
  ALGORITHM_DISPLAY_NAMES 
} from '../constants/constants'

function ControlCenter({
  selectedAlgorithm,
  arraySize,
  sortingSpeed,
  onAlgorithmChange,
  onArraySizeChange,
  onSpeedChange,
  onRandomize,
  onPlay,
  onPause,
  onResume,
  onReset,
  isPlaying,
  isPaused,
  hasArray = false
}) {
  const handleSpeedChange = (e) => {
    const value = Number(e.target.value)
    onSpeedChange(value)
  }

  return (
    <div className="control-center">
      <h2 className="control-center__title">Control Center</h2>
      <div className="control-center__content">
        <div className="control-center__row">
          <div className="control-center__group control-center__group--algorithm">
            <label className="control-center__label">Algorithm:</label>
            <select 
              className="control-center__dropdown control-center__dropdown--algorithm"
              value={selectedAlgorithm}
              onChange={(e) => onAlgorithmChange(e.target.value)}
              disabled={isPlaying}
            >
              <option value={SORTING_ALGORITHMS.BUBBLE}>{ALGORITHM_DISPLAY_NAMES[SORTING_ALGORITHMS.BUBBLE]}</option>
              <option value={SORTING_ALGORITHMS.INSERTION}>{ALGORITHM_DISPLAY_NAMES[SORTING_ALGORITHMS.INSERTION]}</option>
              <option value={SORTING_ALGORITHMS.SELECTION}>{ALGORITHM_DISPLAY_NAMES[SORTING_ALGORITHMS.SELECTION]}</option>
            </select>
          </div>

          <div className="control-center__group control-center__group--array-size">
            <label className="control-center__label">Array Size</label>
            <select 
              className="control-center__dropdown control-center__dropdown--array-size"
              value={arraySize}
              onChange={(e) => onArraySizeChange(Number(e.target.value))}
              disabled={isPlaying}
            >
              {ARRAY_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="control-center__group control-center__group--speed">
            <label className="control-center__label">Sorting Speed</label>
            <input 
              type="range"
              className="control-center__slider"
              min="1"
              max="100"
              value={sortingSpeed}
              onChange={handleSpeedChange}
              disabled={isPlaying}
              style={{ '--slider-progress': `${sortingSpeed}%` }}
            />
          </div>

          <div className="control-center__button-group">
            <button 
              className="control-center__button control-center__button--primary"
              onClick={onRandomize}
              disabled={isPlaying}
            >
              Randomize Value
            </button>
            <Tooltip title={isPlaying && !isPaused ? "Pause" : "Play"}>
              <button 
                className="control-center__button control-center__button--icon"
                onClick={isPlaying && !isPaused ? onPause : (isPaused ? onResume : onPlay)}
                aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
                disabled={!hasArray && !isPlaying}
              >
                <span className="control-center__icon">{isPlaying && !isPaused ? "||" : "▶"}</span>
              </button>
            </Tooltip>
            <Tooltip title="Reset">
              <button 
                className="control-center__button control-center__button--icon"
                onClick={onReset}
                aria-label="Reset"
                disabled={!hasArray}
              >
                <span className="control-center__icon">↻</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlCenter
