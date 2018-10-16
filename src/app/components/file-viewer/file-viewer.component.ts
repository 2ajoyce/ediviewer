import {Component, Input, OnInit} from '@angular/core';
import {EdiElement} from '../../models/edi-element';

@Component({
  selector: 'app-file-viewer',
  styleUrls: ['./file-viewer.component.scss'],
  template: `
    <div *ngFor="let ediElement of ediElements">
      <span class="ref">
        {{ ediElement.ref }}{{ ediElement.index.toString() | pad: 2 }} :
      </span>
      <span>{{ ediElement.data }}</span>
    </div>
  `
})
export class FileViewerComponent implements OnInit {
  @Input() ediElements: Array<EdiElement>;

  constructor() {
  }

  ngOnInit() {
  }

}
