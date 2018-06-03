// TODO: make this human-friendly

export type TypeOfWork =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

// Before we know whether it is functional or class
export const IndeterminateComponent = 0
export const FunctionalComponent = 1
export const ClassComponent = 2
// Root of a host tree. Could be nested inside another node.
export const HostRoot = 3
// A subtree. Could be an entry point to a different renderer.
export const HostPortal = 4 
export const HostComponent = 5
export const HostText = 6
export const CallComponent_UNUSED = 7
export const CallHandlerPhase_UNUSED = 8
export const ReturnComponent_UNUSED = 9
export const Fragment = 10
export const Mode = 11
export const ContextConsumer = 12
export const ContextProvider = 13
export const ForwardRef = 14
export const Profiler = 15
export const TimeoutComponent = 16