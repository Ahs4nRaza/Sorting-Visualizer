import { COMB_SORT } from '../constants/constants'

export function getCombSortAnimations(array) {
  const arr = [...array]
  const n = arr.length
  const animations = []

  let gap = n
  let swapped = true
  let comparisonCount = 0
  let swapCount = 0

  if (n <= 1) {
    animations.push({
      array: [...arr],
      comparedIndices: [],
      swappedIndices: [],
      comparisonCount,
      swapCount,
      metadata: { currentGap: gap }
    })
    return animations
  }

  while (gap !== 1 || swapped) {
    gap = Math.floor(gap / COMB_SORT.SHRINK_FACTOR)
    if (gap < COMB_SORT.MIN_GAP) {
      gap = COMB_SORT.MIN_GAP
    }

    swapped = false

    for (let i = 0; i + gap < n; i++) {
      const j = i + gap
      comparisonCount++

      animations.push({
        array: [...arr],
        comparedIndices: [i, j],
        swappedIndices: [],
        comparisonCount,
        swapCount,
        metadata: { currentGap: gap }
      })

      if (arr[i] > arr[j]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        swapCount++
        swapped = true

        animations.push({
          array: [...arr],
          comparedIndices: [i, j],
          swappedIndices: [i, j],
          comparisonCount,
          swapCount,
          metadata: { currentGap: gap }
        })
      }
    }
  }

  animations.push({
    array: [...arr],
    comparedIndices: [],
    swappedIndices: [],
    comparisonCount,
    swapCount,
    metadata: { currentGap: COMB_SORT.MIN_GAP }
  })

  return animations
}

export function* combSort(array) {
  const steps = getCombSortAnimations(array)

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

