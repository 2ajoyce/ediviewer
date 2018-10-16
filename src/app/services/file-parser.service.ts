import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {EdiElement} from '../models/edi-element';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
  file: BehaviorSubject<Array<EdiElement>> = new BehaviorSubject([]);

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

  parse(fileContents: string): Array<EdiElement> {
    const lines: Array<string> = fileContents.split('\n');
    if (lines[0].slice(0, 3) !== 'ISA') {
      throw new DOMException('Invalid File');
    }

    const delim: string = lines[0][3];
    const ediElements: Array<EdiElement> = [];

    lines.forEach(line => {
      const elements: Array<string> = line.split(delim);

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

    return ediElements;
  }
}
