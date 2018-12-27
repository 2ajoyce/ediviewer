import { Action } from '@ngrx/store';
import {EdiFile} from './models/edi-file';

export enum ActionTypes {
  Drop = '[App] Drop File'
}

export class Drop implements Action {
  readonly type = ActionTypes.Drop;

  constructor(public payload: EdiFile) {}
}

