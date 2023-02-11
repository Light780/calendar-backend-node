import { isValid } from 'date-fns'

export const isDate = (value) => {
  if (!value) {
    return false
  }

  const isValidDate = isValid(new Date(value))
  if (!isValidDate) {
    return false
  }

  return true
}
