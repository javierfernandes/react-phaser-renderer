import { Update } from './typeOfSideEffect'

export const isUpdate = work => work.effectTag & Update
export const getInstance = work => work.stateNode