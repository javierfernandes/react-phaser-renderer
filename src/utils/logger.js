import { mapObjIndexed } from 'ramda'
import stringify from 'json-stringify-safe'

const wrapMethod = (m, name) => (...args) => {
  try {
    console.log(`Calling ${name}(${stringify(args)})`)
  } catch (e) {
    console.log(`Calling ${name}(<< CANNOT SHOW PARAMS :(  FAILED TO STRINGIFY >>)`)
  }
  return m(...args)
}
export const log = mapObjIndexed(wrapMethod)