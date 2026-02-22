export const SORTING_ALGORITHMS = {
  BUBBLE: 'bubble',
  INSERTION: 'insertion',
  SELECTION: 'selection'
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
  [SORTING_ALGORITHMS.SELECTION]: 'Selection Sort'
}

export const ALGORITHM_TIME_COMPLEXITY = {
  [SORTING_ALGORITHMS.BUBBLE]: 'O(n²)',
  [SORTING_ALGORITHMS.INSERTION]: 'O(n²)',
  [SORTING_ALGORITHMS.SELECTION]: 'O(n²)'
}

export const ALGORITHM_SPACE_COMPLEXITY = {
  [SORTING_ALGORITHMS.BUBBLE]: 'O(1)',
  [SORTING_ALGORITHMS.INSERTION]: 'O(1)',
  [SORTING_ALGORITHMS.SELECTION]: 'O(1)'
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
