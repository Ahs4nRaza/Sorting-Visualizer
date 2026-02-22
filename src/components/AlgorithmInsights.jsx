import { 
  ALGORITHM_DISPLAY_NAMES, 
  ALGORITHM_TIME_COMPLEXITY, 
  ALGORITHM_SPACE_COMPLEXITY 
} from '../constants/constants'

function AlgorithmInsights({ selectedAlgorithm, comparisonCount = 0, swapCount = 0 }) {
  const algorithmName = selectedAlgorithm ? ALGORITHM_DISPLAY_NAMES[selectedAlgorithm] || selectedAlgorithm : 'N/A'
  const timeComplexity = selectedAlgorithm ? ALGORITHM_TIME_COMPLEXITY[selectedAlgorithm] || 'N/A' : 'N/A'
  const spaceComplexity = selectedAlgorithm ? ALGORITHM_SPACE_COMPLEXITY[selectedAlgorithm] || 'N/A' : 'N/A'
  
  return (
    <div className="algorithm-insights">
      <h2 className="algorithm-insights__title">Algorithm Insights</h2>
      <div className="algorithm-insights__content">
        <div className="algorithm-insights__item">
          <span className="algorithm-insights__label">Current Algorithm:</span>
          <span className="algorithm-insights__value">{algorithmName}</span>
        </div>
        <div className="algorithm-insights__item">
          <span className="algorithm-insights__label">Time Complexity:</span>
          <span className="algorithm-insights__value">{timeComplexity}</span>
        </div>
        <div className="algorithm-insights__item">
          <span className="algorithm-insights__label">Space Complexity:</span>
          <span className="algorithm-insights__value">{spaceComplexity}</span>
        </div>
        <div className="algorithm-insights__item">
          <span className="algorithm-insights__label">Comparisons:</span>
          <span className="algorithm-insights__value">{comparisonCount}</span>
        </div>
        <div className="algorithm-insights__item">
          <span className="algorithm-insights__label">Swap Count:</span>
          <span className="algorithm-insights__value">{swapCount}</span>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmInsights
