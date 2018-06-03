import { NoWork } from '../expirationTime' 

export const UpdateState = 0
export const ReplaceState = 1
export const ForceUpdate = 2
export const CaptureUpdate = 3

// main API

export const createUpdate = expirationTime => ({
  expirationTime: expirationTime,

  tag: UpdateState,
  payload: null,
  callback: null,

  next: null,
  nextEffect: null,
})

export const enqueueUpdate = (fiber, update, expirationTime) => {
  // Update queues are created lazily.
  const { alternate } = fiber
  let queue1
  let queue2
  if (alternate === null) {
    // There's only one fiber.
    queue1 = fiber.updateQueue
    queue2 = null
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {
    // There are two owners.
    queue1 = fiber.updateQueue
    queue2 = alternate.updateQueue
    
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2)
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1)
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update, expirationTime)
  } else {
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update, expirationTime)
      appendUpdateToQueue(queue2, update, expirationTime)
    } else {
      // Both queues are non-empty. The last update is the same in both lists,
      // because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update, expirationTime)
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update
    }
  }
}

// internal enqueueUpdate

export const createUpdateQueue = baseState => ({
  expirationTime: NoWork,
  baseState,
  firstUpdate: null,
  lastUpdate: null,
  firstCapturedUpdate: null,
  lastCapturedUpdate: null,
  firstEffect: null,
  lastEffect: null,
  firstCapturedEffect: null,
  lastCapturedEffect: null,
})

const cloneUpdateQueue = (currentQueue) => ({
  expirationTime: currentQueue.expirationTime,
  baseState: currentQueue.baseState,
  firstUpdate: currentQueue.firstUpdate,
  lastUpdate: currentQueue.lastUpdate,

  firstCapturedUpdate: null,
  lastCapturedUpdate: null,

  firstEffect: null,
  lastEffect: null,

  firstCapturedEffect: null,
  lastCapturedEffect: null,
})

const appendUpdateToQueue = (queue, update, expirationTime) => {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
  // Update the queue's expiration time.
  if (queue.expirationTime === NoWork || queue.expirationTime > expirationTime ) {
    queue.expirationTime = expirationTime
  }
}