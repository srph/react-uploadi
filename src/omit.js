/**
 * Generate a new array without the provided keys.
 * Bare minimum implementation of `omit`.
 * @param {<mixed>} arr
 * @param {<String>} keys
 */
export default function omit(arr, keys) {
  let result = {}

  for (let key in arr) {
    if (!~keys.indexOf(key)) {
      result[key] = arr[key]
    }
  }

  return result
}
