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
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

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

