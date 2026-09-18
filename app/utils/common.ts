/**
 * Checks if a value is empty (null, undefined, or an empty string).
 * @param value The value to check.
 * @returns True if the value is empty, false otherwise.
 */
const isEmpty = (value: any): boolean => {
  return value === null || value === undefined || value === ''
}

export { isEmpty }
