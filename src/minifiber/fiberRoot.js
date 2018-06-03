import { createHostRootFiber } from './fiber'
import { NoWork } from './expirationTime'

export function createFiberRoot(containerInfo, isAsync, hydrate) {
  const uninitializedFiber = createHostRootFiber(isAsync)
  const root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    pendingChildren: null,

    earliestPendingTime: NoWork,
    latestPendingTime: NoWork,
    earliestSuspendedTime: NoWork,
    latestSuspendedTime: NoWork,
    latestPingedTime: NoWork,

    pendingCommitExpirationTime: NoWork,
    finishedWork: null,
    context: null,
    pendingContext: null,
    hydrate,
    remainingExpirationTime: NoWork,
    firstBatch: null,
    nextScheduledRoot: null,
  }
  uninitializedFiber.stateNode = root
  return root
}