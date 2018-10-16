import {EdiElement} from './edi-element';

export interface EdiFile {
  elementDelimiter: string;
  compositeDelimiter: string;
  segmentDelimiter: string;
  elements: Array<EdiElement>;
}
