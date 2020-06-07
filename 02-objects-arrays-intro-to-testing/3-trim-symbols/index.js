/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size = Infinity) {
  const strArr = string.split('')
  let n = 1
  let l = ''

  const result = strArr.reduce((accum, letter) => {
    if (letter === l) {
      n += 1
    } else {
      n = 1
      l = letter
    }

    if (n <= size) {
      accum += letter
    }
    return accum
  }, '')

  return result
}
