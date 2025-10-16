import { EdiFile } from './models/edi-file';
import { ActionTypes, Drop } from './file.actions';
import { Action } from '@ngrx/store';

export const initialState: EdiFile | null = null;

export function fileReducer(state: EdiFile | null = initialState, action: Action): EdiFile | null {
  switch (action.type) {
    case ActionTypes.Drop:
      return (action as Drop).payload;

    default:
      return state;
  }
}
