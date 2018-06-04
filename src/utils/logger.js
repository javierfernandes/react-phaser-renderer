import { mapObjIndexed, ifElse, identity } from 'ramda'
import stringify from 'json-stringify-safe'

const safeToString = e => {
  try {
    return stringify(e)
  } catch (err) {
    return `<< ERROR SHOWING PARAM: ${e} >>`
  }
}

/* eslint no-console: 0 */
const wrapMethod = (preffix = '') => (m, name) => (...args) => {
  try {
    console.log(`Calling ${preffix}.${name}(${args.map(safeToString).join(',')})`)
  } catch (e) {
    console.log(`Calling ${preffix}.${name}(<< CANNOT SHOW PARAMS :(  FAILED TO STRINGIFY >>)`)
  }
  return m(...args)
}
export const log = (obj, preffix, { ignore = [] } = { ignore: [] }) => mapObjIndexed(
  ifElse((value, name) => !ignore.includes(name), wrapMethod(preffix), identity)
)(obj)

export default log 