import { SORTING_ALGORITHMS } from '../constants/constants'
import { bubbleSort } from './bubbleSort'
import { insertionSort } from './insertionSort'
import { selectionSort } from './selectionSort'
import { combSort } from './combSort'
import { shellSort } from './shellSort'
import { cocktailSort } from './cocktailSort'

export { bubbleSort, insertionSort, selectionSort, combSort, shellSort, cocktailSort }

export function getSortFunction(algorithm) {
  switch (algorithm) {
    case SORTING_ALGORITHMS.BUBBLE:
      return bubbleSort
    case SORTING_ALGORITHMS.INSERTION:
      return insertionSort
    case SORTING_ALGORITHMS.SELECTION:
      return selectionSort
    case SORTING_ALGORITHMS.COMB:
      return combSort
    case SORTING_ALGORITHMS.SHELL:
      return shellSort
    case SORTING_ALGORITHMS.COCKTAIL:
      return cocktailSort
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`)
  }
}
