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

