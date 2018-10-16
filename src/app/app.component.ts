import {Component} from '@angular/core';
import {FileParserService} from './services/file-parser.service';
import {EdiElement} from './models/edi-element';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="page">
      <h1>EDI Viewer</h1>
      <section *ngIf="!ediElements?.length" appDnd>
        <p>Drop Your File Here</p>
      </section>
      <app-file-viewer
        *ngIf="ediElements?.length"
        appDnd
        [ediElements]="ediElements"
      ></app-file-viewer>
    </div>
  `
})
export class AppComponent {
  ediElements: Array<EdiElement>;

  constructor(private fileParseService: FileParserService) {
    this.fileParseService.file.subscribe(file => this.ediElements = file);
  }
}
