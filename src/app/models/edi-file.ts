import {EdiElement} from './edi-element';

export interface EdiFile {
  elementDelimiter: string;
  componentSeparator: string;
  segmentDelimiter: string;
  elements: Array<EdiElement>;
}
