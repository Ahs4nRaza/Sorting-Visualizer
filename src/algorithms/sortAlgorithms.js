export function* bubbleSort(array) {
  const arr = [...array]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    const sortedIndices = []
    for (let k = n - i - 1; k < n; k++) {
      sortedIndices.push(k)
    }

    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        sortedIndices: sortedIndices
      }

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true

        yield {
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
          sortedIndices: sortedIndices
        }
      }
    }

    yield {
      array: [...arr],
      comparing: [],
      swapped: false,
      sortedIndices: sortedIndices
    }

    if (!swapped) break
  }

  yield {
    array: [...arr],
    comparing: [],
    swapped: false,
    sortedIndices: Array.from({ length: n }, (_, i) => i)
  }
}

export function* insertionSort(array) {
  const arr = [...array]
  const n = arr.length

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    yield {
      array: [...arr],
      comparing: [i, j],
      swapped: false,
      sortedIndices: Array.from({ length: i }, (_, idx) => idx)
    }

    while (j >= 0 && arr[j] > key) {
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        sortedIndices: Array.from({ length: i }, (_, idx) => idx)
      }

      arr[j + 1] = arr[j]
      j--

      if (j >= 0) {
        yield {
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
          sortedIndices: Array.from({ length: i }, (_, idx) => idx)
        }
      }
    }

    arr[j + 1] = key

    yield {
      array: [...arr],
      comparing: [],
      swapped: false,
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx)
    }
  }

  yield {
    array: [...arr],
    comparing: [],
    swapped: false,
    sortedIndices: Array.from({ length: n }, (_, i) => i)
  }
}

export function* selectionSort(array) {
  const arr = [...array]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    yield {
      array: [...arr],
      comparing: [i],
      swapped: false,
      sortedIndices: Array.from({ length: i }, (_, idx) => idx)
    }

    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...arr],
        comparing: [minIndex, j],
        swapped: false,
        sortedIndices: Array.from({ length: i }, (_, idx) => idx)
      }

      if (arr[j] < arr[minIndex]) {
        minIndex = j

        yield {
          array: [...arr],
          comparing: [minIndex, j],
          swapped: false,
          sortedIndices: Array.from({ length: i }, (_, idx) => idx)
        }
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

      yield {
        array: [...arr],
        comparing: [i, minIndex],
        swapped: true,
        sortedIndices: Array.from({ length: i }, (_, idx) => idx)
      }
    }

    yield {
      array: [...arr],
      comparing: [],
      swapped: false,
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx)
    }
  }

  yield {
    array: [...arr],
    comparing: [],
    swapped: false,
    sortedIndices: Array.from({ length: n }, (_, i) => i)
  }
}

export function getSortFunction(algorithm) {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort
    case 'insertion':
      return insertionSort
    case 'selection':
      return selectionSort
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`)
  }
}
