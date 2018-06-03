import { createFiberRoot } from '../fiberRoot'
import { recalculateCurrentTime, computeExpirationForFiber, scheduleWork } from './scheduler'
import { createUpdate, enqueueUpdate } from './updateQueue'

// create 

export const createContainer = (containerInfo, isAsync, hydrate) =>
  createFiberRoot(containerInfo, isAsync, hydrate)

// update

export function updateContainer(element, container, parentComponent, callback) {
  const { current } = container
  const currentTime = recalculateCurrentTime()
  const expirationTime = computeExpirationForFiber(currentTime, current)
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback)
}

export function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
  // TODO: If this is a nested container, this won't be the root.
  const current = container.current

  const context = getContextForSubtree(parentComponent)
  container[container.context === null ? 'context' : 'pendingContext'] = context
  return scheduleRootUpdate(current, element, expirationTime, callback);
}

// ...

const scheduleRootUpdate = (current, element, expirationTime, callback) => {
  const update = createUpdate(expirationTime)
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }
  enqueueUpdate(current, update, expirationTime)

  scheduleWork(current, expirationTime)
  return expirationTime
}