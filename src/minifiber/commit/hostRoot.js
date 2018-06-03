import { ClassComponent, HostComponent } from '../typeOfWork'

export default (finishedWork, current, committedExpirationTime) => {
  const updateQueue = finishedWork.updateQueue
  if (updateQueue !== null) {
    const instance = getInstance(finishedWork)
    commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime)
  }
}

const getInstance = (finishedWork) => {
  if (finishedWork.child === null) {
    return undefined
  }
  switch (finishedWork.child.tag) {
    case HostComponent: return getPublicInstance(finishedWork.child.stateNode)
    case ClassComponent: return finishedWork.child.stateNode
    default: return undefined
  }
}