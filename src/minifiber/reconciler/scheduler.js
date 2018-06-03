import { NoWork } from '../expirationTime'

export const scheduleWork = (fiber, expirationTime) => {
  recordScheduleUpdate()

  let node = fiber
  while (node !== null) {
    // Walk the parent path to the root and update each node's
    // expiration time.
    if (
      node.expirationTime === NoWork ||
      node.expirationTime > expirationTime
    ) {
      node.expirationTime = expirationTime;
    }
    if (node.alternate !== null) {
      if (
        node.alternate.expirationTime === NoWork ||
        node.alternate.expirationTime > expirationTime
      ) {
        node.alternate.expirationTime = expirationTime;
      }
    }
    if (node.return === null) {
      if (node.tag === HostRoot) {
        const root: FiberRoot = (node.stateNode: any);
        if (
          !isWorking &&
          nextRenderExpirationTime !== NoWork &&
          expirationTime < nextRenderExpirationTime
        ) {
          // This is an interruption. (Used for performance tracking.)
          interruptedBy = fiber;
          resetStack();
        }
        markPendingPriorityLevel(root, expirationTime);
        const nextExpirationTimeToWorkOn = findNextPendingPriorityLevel(root);
        if (
          // If we're in the render phase, we don't need to schedule this root
          // for an update, because we'll do it before we exit...
          !isWorking ||
          isCommitting ||
          // ...unless this is a different root than the one we're rendering.
          nextRoot !== root
        ) {
          requestWork(root, nextExpirationTimeToWorkOn);
        }
        if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
          invariant(
            false,
            'Maximum update depth exceeded. This can happen when a ' +
              'component repeatedly calls setState inside ' +
              'componentWillUpdate or componentDidUpdate. React limits ' +
              'the number of nested updates to prevent infinite loops.',
          );
        }
      } else {
        if (__DEV__) {
          if (fiber.tag === ClassComponent) {
            warnAboutUpdateOnUnmounted(fiber);
          }
        }
        return;
      }
    }
    node = node.return;
  }
}