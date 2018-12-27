import {EdiFile} from './models/edi-file';
import {ActionTypes, Drop} from './file.actions';

export const initialState: EdiFile = null;

export function fileReducer(state = initialState, action: Drop) {
  switch (action.type) {
    case ActionTypes.Drop:
      return action.payload;

    default:
      return state;
  }
}
