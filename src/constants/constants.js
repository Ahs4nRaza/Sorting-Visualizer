export const SORTING_ALGORITHMS = {
  BUBBLE: 'bubble',
  INSERTION: 'insertion',
  SELECTION: 'selection',
  COMB: 'comb',
  SHELL: 'shell',
  COCKTAIL: 'cocktail'
}

export const ARRAY_SIZES = [10, 15, 25, 40, 50]

export const SORTING_SPEEDS = {
  SLOW: 'Slow',
  MEDIUM: 'Medium',
  FAST: 'Fast'
}

export const SPEED_THRESHOLDS = {
  SLOW: 33,
  MEDIUM: 66,
  FAST: 100
}

export const ALGORITHM_DISPLAY_NAMES = {
  [SORTING_ALGORITHMS.BUBBLE]: 'Bubble Sort',
  [SORTING_ALGORITHMS.INSERTION]: 'Insertion Sort',
  [SORTING_ALGORITHMS.SELECTION]: 'Selection Sort',
  [SORTING_ALGORITHMS.COMB]: 'Comb Sort',
  [SORTING_ALGORITHMS.SHELL]: 'Shell Sort',
  [SORTING_ALGORITHMS.COCKTAIL]: 'Cocktail Sort'
}

export const ALGORITHM_TIME_COMPLEXITY = {
  [SORTING_ALGORITHMS.BUBBLE]: 'O(n²)',
  [SORTING_ALGORITHMS.INSERTION]: 'O(n²)',
  [SORTING_ALGORITHMS.SELECTION]: 'O(n²)',
  [SORTING_ALGORITHMS.COMB]: 'O(n²)',
  [SORTING_ALGORITHMS.SHELL]: 'O(n²)',
  [SORTING_ALGORITHMS.COCKTAIL]: 'O(n²)'
}

export const ALGORITHM_SPACE_COMPLEXITY = {
  [SORTING_ALGORITHMS.BUBBLE]: 'O(1)',
  [SORTING_ALGORITHMS.INSERTION]: 'O(1)',
  [SORTING_ALGORITHMS.SELECTION]: 'O(1)',
  [SORTING_ALGORITHMS.COMB]: 'O(1)',
  [SORTING_ALGORITHMS.SHELL]: 'O(1)',
  [SORTING_ALGORITHMS.COCKTAIL]: 'O(1)'
}

export const BAR_STATUS = {
  DEFAULT: 'default',
  COMPARING: 'comparing',
  SORTED: 'sorted'
}

export const BAR_COLORS = {
  [BAR_STATUS.DEFAULT]: '#3b82f6',
  [BAR_STATUS.COMPARING]: '#ef4444',
  [BAR_STATUS.SORTED]: '#10b981'
}

export const RANDOM_ARRAY_RANGE = {
  MIN: 10,
  MAX: 99
}

export const COMB_SORT = {
  SHRINK_FACTOR: 1.3,
  MIN_GAP: 1
}

export const SHELL_SORT = {
  GAP_DIVISOR: 2
}

export const COCKTAIL_SORT = {
  FORWARD: 'forward',
  BACKWARD: 'backward'
}
