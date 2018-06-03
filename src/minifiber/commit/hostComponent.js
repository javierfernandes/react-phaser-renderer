import { isUpdate } from '../utils'

export default (finishedWork, current) => {
  const instance = finishedWork.stateNode

  // Renderers may schedule work to be done after host components are mounted
  // (eg DOM renderer may schedule auto-focus for inputs and form controls).
  // These effects should only be committed when components are first mounted,
  // aka when there is no current/alternate.
  if (current === null && isUpdate(finishedWork)) {
    const type = finishedWork.type
    const props = finishedWork.memoizedProps
    commitMount(instance, type, props, finishedWork)
  }
}