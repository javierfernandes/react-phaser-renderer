import invariant from 'fbjs/lib/invariant'

import {
  ClassComponent,
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  Profiler,
  TimeoutComponent,
} from './typeOfWork'

import {
  ContentReset,
  Placement,
  Snapshot,
  Update,
} from './typeOfSideEffect'

import commitClassComponent from './commit/class'
import commitHostRoot from './commit/hostRoot'
import commitHostComponent from './commit/hostComponent'

const commitLifeCycles = (finishedRoot, current, finishedWork, currentTime, committedExpirationTime) => {
  switch (finishedWork.tag) {
    case ClassComponent:
      commitClassComponent(finishedWork, current, committedExpirationTime); return
    case HostRoot: 
      commitHostRoot(finishedWork, current, committedExpirationTime); return
    case HostComponent: 
      commitHostComponent(finishedWork, current, committedExpirationTime); return
    // tags with no life-cycles associated
    case HostText: 
    case HostPortal: 
    case Profiler: 
    case TimeoutComponent:
    default: invariant(
      false,
      'This unit of work tag should not have side-effects. This error is ' +
        'likely caused by a bug in React. Please file an issue.',
    )
  }
}