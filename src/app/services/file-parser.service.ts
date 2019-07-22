import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EdiElement} from '../models/edi-element';
import {EdiFile} from '../models/edi-file';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
  read(file: File): Observable<EdiFile> {
    const fileReader: FileReader = new FileReader();
    const ediFile: BehaviorSubject<EdiFile> = new BehaviorSubject(null);

    fileReader.onload = (e) => {
      const fileContents = fileReader.result.toString();
      ediFile.next(this.parse(fileContents));
    };

    fileReader.readAsText(file);
    return ediFile;
  }

  private parse(fileContents: string): EdiFile {
    let lines: Array<string> = fileContents.split('\n');
    if (lines[0].slice(0, 3) !== 'ISA') {
      throw new DOMException('Invalid File');
    }

    const elementDelimiter: string = lines[0][3];
    const componentSeparator: string = lines[0].slice(-3, -2);
    const segmentDelimiter: string = lines[0].slice(-2, -1);
    const ediElements: Array<EdiElement> = [];

    lines = lines.map(line => line.replace(componentSeparator, ''));
    lines = lines.map(line => line.replace(segmentDelimiter, ''));

    lines.forEach(line => {
      const elements: Array<string> = line.split(elementDelimiter);

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
      elementDelimiter: elementDelimiter,
      componentSeparator: componentSeparator,
      segmentDelimiter: segmentDelimiter,
      elements: ediElements
    };
  }
}
