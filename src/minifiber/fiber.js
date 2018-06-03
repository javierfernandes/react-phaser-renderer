import { NoEffect } from './typeOfSideEffect'
import { NoWork } from './typeOfWork'
import { NoContext, AsyncMode, StrictMode } from './typeOfMode'
import {
  IndeterminateComponent,
  ClassComponent,
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  ForwardRef,
  Fragment,
  Mode,
  ContextProvider,
  ContextConsumer,
  Profiler,
  TimeoutComponent,
} from './typeOfWork'

export function createHostRootFiber(isAsync: boolean) {
  const mode = isAsync ? AsyncMode | StrictMode : NoContext
  return createFiber(HostRoot, null, null, mode)
}

const createFiber = (tag, pendingProps, key, mode) => new FiberNode(tag, pendingProps, key, mode)

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag
  this.key = key
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null

  this.mode = mode

  // Effects
  this.effectTag = NoEffect
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.expirationTime = NoWork

  this.alternate = null
}