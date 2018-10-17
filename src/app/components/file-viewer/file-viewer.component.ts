import {Component, Input, OnInit} from '@angular/core';
import {EdiFile} from '../../models/edi-file';

@Component({
  selector: 'app-file-viewer',
  styleUrls: ['./file-viewer.component.scss'],
  template: `
    <span class="bold">Element Delimiter:</span> {{ file.elementDelimiter }}<br>
    <span class="bold">Component Separator:</span> {{ file.componentSeparator}}<br>
    <span class="bold">Segment Delimiter:</span> {{ file.segmentDelimiter}}<br>
    <div *ngFor="let ediElement of file.elements">
      <span class="bold">
        {{ ediElement.ref }}-{{ ediElement.index.toString() | pad: 2 }} :
      </span>
      <span>{{ ediElement.data }}</span>
    </div>
  `
})
export class FileViewerComponent implements OnInit {
  @Input() file: EdiFile;

  constructor() {
  }

  ngOnInit() {
  }

}
