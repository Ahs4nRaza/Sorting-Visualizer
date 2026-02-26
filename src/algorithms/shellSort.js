import { SHELL_SORT } from '../constants/constants'

export function getShellSortAnimations(array) {
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
      metadata: { currentGap: 0 }
    })
    return animations
  }

  let gap = Math.floor(n / SHELL_SORT.GAP_DIVISOR)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i

      while (j >= gap) {
        comparisonCount++

        animations.push({
          array: [...arr],
          comparedIndices: [j - gap, j],
          swappedIndices: [],
          comparisonCount,
          swapCount,
          metadata: { currentGap: gap }
        })

        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap]
          swapCount++

          animations.push({
            array: [...arr],
            comparedIndices: [j - gap, j],
            swappedIndices: [j - gap, j],
            comparisonCount,
            swapCount,
            metadata: { currentGap: gap }
          })

          j -= gap
        } else {
          break
        }
      }

      arr[j] = temp

      if (j !== i) {
        swapCount++

        animations.push({
          array: [...arr],
          comparedIndices: [j, i],
          swappedIndices: [j, i],
          comparisonCount,
          swapCount,
          metadata: { currentGap: gap }
        })
      }
    }

    gap = Math.floor(gap / SHELL_SORT.GAP_DIVISOR)
  }

  animations.push({
    array: [...arr],
    comparedIndices: [],
    swappedIndices: [],
    comparisonCount,
    swapCount,
    metadata: { currentGap: 0 }
  })

  return animations
}

export function* shellSort(array) {
  const steps = getShellSortAnimations(array)

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

