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
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
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

