import { useState, useEffect, useRef, useMemo } from 'react'
import Header from './components/Header'
import ControlCenter from './components/ControlCenter'
import LiveVisualization from './components/LiveVisualization'
import AlgorithmInsights from './components/AlgorithmInsights'
import { 
  SORTING_ALGORITHMS, 
  ARRAY_SIZES, 
  ALGORITHM_DISPLAY_NAMES,
  RANDOM_ARRAY_RANGE
} from './constants/constants'
import { getSortFunction } from './algorithms/sortAlgorithms'

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(SORTING_ALGORITHMS.BUBBLE)
  const [arraySize, setArraySize] = useState(ARRAY_SIZES[2])
  const [sortingSpeed, setSortingSpeed] = useState(50)
  const [arrayKey, setArrayKey] = useState(0)
  const [hasGeneratedArray, setHasGeneratedArray] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentStepData, setCurrentStepData] = useState(null)
  const [swapCount, setSwapCount] = useState(0)
  const [comparisonCount, setComparisonCount] = useState(0)
  const [currentGap, setCurrentGap] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSortingComplete, setIsSortingComplete] = useState(false)
  
  const intervalRef = useRef(null)
  const sortGeneratorRef = useRef(null)
  const seenStepsRef = useRef([])

  const generateRandomArray = (size) => {
    const min = RANDOM_ARRAY_RANGE.MIN
    const max = RANDOM_ARRAY_RANGE.MAX
    return Array.from({ length: size }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    )
  }

  const array = useMemo(() => {
    if (!hasGeneratedArray) return null
    return generateRandomArray(arraySize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize, arrayKey, hasGeneratedArray])

  const getAnimationDelay = (speed) => {
    return 510 - (speed * 5)
  }
  useEffect(() => {
    if (!array || array.length === 0) {
      sortGeneratorRef.current = null
      seenStepsRef.current = []
      setCurrentStepData(null)
      setCurrentGap(null)
      return
    }
    
    const sortFunction = getSortFunction(selectedAlgorithm)
    sortGeneratorRef.current = sortFunction(array)
    seenStepsRef.current = []
    setCurrentStep(0)
    setSwapCount(0)
    setComparisonCount(0)
    setIsPlaying(false)
    setIsPaused(false)
    setIsSortingComplete(false)
    setCurrentStepData(null)
    setCurrentGap(null)
  }, [array, selectedAlgorithm])

  useEffect(() => {
    if (isPlaying && !isPaused && sortGeneratorRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          if (seenStepsRef.current[nextStep]) {
            const step = seenStepsRef.current[nextStep]
            setCurrentStepData(step)
            setCurrentGap(step?.metadata?.currentGap ?? null)
            const stepsUpToNow = seenStepsRef.current.slice(0, nextStep + 1)
            setSwapCount(stepsUpToNow.filter(s => s?.swapped).length)
            setComparisonCount(stepsUpToNow.filter(s => s?.comparing && s.comparing.length > 0).length)
            return nextStep
          } else {
            if (sortGeneratorRef.current) {
              const next = sortGeneratorRef.current.next()
              if (next.done) {
                setIsPlaying(false)
                setIsSortingComplete(true)
                const finalArray = seenStepsRef.current[prev]?.array || array
                setCurrentStepData({
                  array: finalArray,
                  comparing: [],
                  swapped: false,
                  sortedIndices: finalArray.map((_, i) => i)
                })
                setCurrentGap(null)
                return prev
              } else {
                setIsSortingComplete(false)
                seenStepsRef.current[nextStep] = next.value
                setCurrentStepData(next.value)
                setCurrentGap(next.value?.metadata?.currentGap ?? null)
                const stepsUpToNow = seenStepsRef.current.slice(0, nextStep + 1)
                setSwapCount(stepsUpToNow.filter(s => s?.swapped).length)
                setComparisonCount(stepsUpToNow.filter(s => s?.comparing && s.comparing.length > 0).length)
                return nextStep
              }
            }
            return prev
          }
        })
      }, getAnimationDelay(sortingSpeed))
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isPaused, sortingSpeed])

  const handleRandomize = () => {
    setHasGeneratedArray(true)
    setArrayKey(prev => prev + 1)
    setCurrentStep(0)
    setCurrentStepData(null)
    setSwapCount(0)
    setComparisonCount(0)
    setIsPlaying(false)
    setIsPaused(false)
    setIsSortingComplete(false)
    setCurrentGap(null)
  }

  const handlePlay = () => {
    if (!sortGeneratorRef.current || !array) return
    
    if (seenStepsRef.current.length > 0 && currentStep >= seenStepsRef.current.length - 1) {
      setCurrentStep(0)
      setSwapCount(0)
      setComparisonCount(0)
      const sortFunction = getSortFunction(selectedAlgorithm)
      sortGeneratorRef.current = sortFunction(array)
      seenStepsRef.current = []
      setCurrentStepData(null)
      setIsPlaying(true)
      setIsPaused(false)
    } else {
      if (currentStep === 0 && seenStepsRef.current.length === 0) {
        const firstStep = sortGeneratorRef.current.next()
        if (!firstStep.done) {
          seenStepsRef.current[0] = firstStep.value
          setCurrentStepData(firstStep.value)
          setCurrentStep(0)
          setCurrentGap(firstStep.value?.metadata?.currentGap ?? null)
          if (firstStep.value.swapped) {
            setSwapCount(1)
          }
          if (firstStep.value.comparing && firstStep.value.comparing.length > 0) {
            setComparisonCount(1)
          }
        }
      }
      setIsPlaying(true)
      setIsPaused(false)
    }
  }

  const handleResume = () => {
    if (isPaused) {
      setIsPaused(false)
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    setIsPaused(true)
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentStep(0)
    setSwapCount(0)
    setComparisonCount(0)
    setIsSortingComplete(false)
    setCurrentGap(null)
    if (array && array.length > 0) {
      const sortFunction = getSortFunction(selectedAlgorithm)
      sortGeneratorRef.current = sortFunction(array)
      seenStepsRef.current = []
      setCurrentStepData(null)
      setCurrentGap(null)
    }
  }

  const handleSpeedChange = (value) => {
    setSortingSpeed(value)
  }

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm)
    handleReset()
  }

  const handleArraySizeChange = (size) => {
    setArraySize(size)
    handleReset()
  }

  return (
    <div className="app-wrapper">
      <Header />
      <ControlCenter 
        selectedAlgorithm={selectedAlgorithm}
        arraySize={arraySize}
        sortingSpeed={sortingSpeed}
        onAlgorithmChange={handleAlgorithmChange}
        onArraySizeChange={handleArraySizeChange}
        onSpeedChange={handleSpeedChange}
        onRandomize={handleRandomize}
        onPlay={handlePlay}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        isPlaying={isPlaying}
        isPaused={isPaused}
        hasArray={!!array}
      />
      <LiveVisualization 
        array={currentStepData?.array || array || null}
        comparing={currentStepData?.comparing || []}
        swapped={currentStepData?.swapped || false}
        sortedIndices={currentStepData?.sortedIndices || []}
        isSortingComplete={isSortingComplete}
      />
      <AlgorithmInsights 
        selectedAlgorithm={selectedAlgorithm}
        comparisonCount={comparisonCount}
        swapCount={swapCount}
        gap={currentGap}
      />
    </div>
  )
}

export default App
