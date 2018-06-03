import { getInstance, isUpdate } from '../utils'

const commitClassComponent = (finishedWork, current, committedExpirationTime) => {
  const instance = getInstance(finishedWork)
  if (isUpdate(finishedWork)) {
    if (current === null) {
      instance.props = finishedWork.memoizedProps
      instance.state = finishedWork.memoizedState
      instance.componentDidMount()
    } else {
      const [prevProps, prevState] = [current.memoizedProps, current.memoizedState]

      instance.props = finishedWork.memoizedProps
      instance.state = finishedWork.memoizedState

      instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate)
    }
  }
  const updateQueue = finishedWork.updateQueue
  if (updateQueue !== null) {
    instance.props = finishedWork.memoizedProps
    instance.state = finishedWork.memoizedState
    commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime)
  }
}

export default commitClassComponent