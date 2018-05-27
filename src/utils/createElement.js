import { pipe, map, mergeAll, merge, construct, values, keys } from 'ramda'
import Types from '../types'
import * as componentConstructors from '../components/index'

const createElement = (type, props, root) => factory(type)(props, root)
const factory = type => factoryByType[type] || factoryByType.default

const constructorForType = type => {
  const fnKey = keys(componentConstructors).find(c => c.toLowerCase() === type.toLowerCase())
  return fnKey && construct(componentConstructors[fnKey])
}

export const factoryByType = pipe(
  values,
  map(type => ({
    [type]: constructorForType(type)
  })),
  mergeAll,
  merge({ default: () => undefined })
)(Types)

export default createElement