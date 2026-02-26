import { COCKTAIL_SORT } from '../constants/constants'

export function getCocktailSortAnimations(array) {
  const arr = [...array]
  const n = arr.length
  const animations = []

  let comparisonCount = 0
  let swapCount = 0

  if (n <= 1) {
    animations.push({
      array: [...arr],
      comparedIndices: [],
      swappedIndices: [],
      comparisonCount,
      swapCount,
      metadata: { direction: null }
    })
    return animations
  }

  let start = 0
  let end = n - 1
  let swapped = true

  while (swapped) {
    swapped = false

    for (let i = start; i < end; i++) {
      comparisonCount++

      animations.push({
        array: [...arr],
        comparedIndices: [i, i + 1],
        swappedIndices: [],
        comparisonCount,
        swapCount,
        metadata: { direction: COCKTAIL_SORT.FORWARD }
      })

      if (arr[i] > arr[i + 1]) {
        const temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
        swapCount++
        swapped = true

        animations.push({
          array: [...arr],
          comparedIndices: [i, i + 1],
          swappedIndices: [i, i + 1],
          comparisonCount,
          swapCount,
          metadata: { direction: COCKTAIL_SORT.FORWARD }
        })
      }
    }

    if (!swapped) {
      break
    }

    swapped = false
    end--

    for (let i = end - 1; i >= start; i--) {
      comparisonCount++

      animations.push({
        array: [...arr],
        comparedIndices: [i, i + 1],
        swappedIndices: [],
        comparisonCount,
        swapCount,
        metadata: { direction: COCKTAIL_SORT.BACKWARD }
      })

      if (arr[i] > arr[i + 1]) {
        const temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
        swapCount++
        swapped = true

        animations.push({
          array: [...arr],
          comparedIndices: [i, i + 1],
          swappedIndices: [i, i + 1],
          comparisonCount,
          swapCount,
          metadata: { direction: COCKTAIL_SORT.BACKWARD }
        })
      }
    }

    start++
  }

  animations.push({
    array: [...arr],
    comparedIndices: [],
    swappedIndices: [],
    comparisonCount,
    swapCount,
    metadata: { direction: null }
  })

  return animations
}

export function* cocktailSort(array) {
  const steps = getCocktailSortAnimations(array)

  for (const step of steps) {
    yield {
      array: step.array,
      comparing: step.comparedIndices || [],
      swapped: !!(step.swappedIndices && step.swappedIndices.length),
      sortedIndices: [],
      comparisonCount: step.comparisonCount,
      swapCount: step.swapCount,
      metadata: step.metadata
    }
  }
}

