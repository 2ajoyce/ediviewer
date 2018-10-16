import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {EdiElement} from '../models/edi-element';
import {EdiFile} from '../models/edi-file';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
  file: BehaviorSubject<EdiFile> = new BehaviorSubject(null);

  constructor() {
  }

  read(file: File): void {
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      const fileContents = fileReader.result;
      this.file.next(this.parse(fileContents));
    };

    fileReader.readAsText(file);
  }

  parse(fileContents: string): EdiFile {
    let lines: Array<string> = fileContents.split('\n');
    if (lines[0].slice(0, 3) !== 'ISA') {
      throw new DOMException('Invalid File');
    }

    const elementDelim: string = lines[0][3];
    const compositeDelim: string = lines[0].slice(-3, -2);
    const segmentDelim: string = lines[0].slice(-2, -1);
    const ediElements: Array<EdiElement> = [];

    lines = lines.map(line => line.replace(compositeDelim, ''));
    lines = lines.map(line => line.replace(segmentDelim, ''));

    lines.forEach(line => {
      const elements: Array<string> = line.split(elementDelim);

      elements.forEach((element, i) => {
        if (i > 0 && element.trim() !== '') {
          const ediElement: EdiElement = {
            ref: elements[0],
            index: i,
            data: element,
          };

          ediElements.push(ediElement);
        }
      });
    });

    return <EdiFile> {
      elementDelimiter: elementDelim,
      compositeDelimiter: compositeDelim,
      segmentDelimiter: segmentDelim,
      elements: ediElements
    };
  }
}
