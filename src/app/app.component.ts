import {Component} from '@angular/core';
import {FileParserService} from './services/file-parser.service';
import {EdiFile} from './models/edi-file';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="page">
      <h1>EDI Viewer</h1>
      <section *ngIf="!file" appDnd>
        <p>Drop Your File Here</p>
      </section>
      <app-file-viewer
        *ngIf="file"
        appDnd
        [file]="file"
      ></app-file-viewer>
    </div>
  `
})
export class AppComponent {
  file: EdiFile;

  constructor(private fileParseService: FileParserService) {
    this.fileParseService.file.subscribe(file => this.file = file);
  }
}
