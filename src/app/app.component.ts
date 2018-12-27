import {Component} from '@angular/core';
import {EdiFile} from './models/edi-file';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div appDnd>
      <div class="page">
        <h1>EDI Viewer</h1>
        <section *ngIf="!file">
          <p>Drop Your File Here</p>
        </section>
        <app-file-viewer *ngIf="file" [file]="file"></app-file-viewer>
      </div>
    </div>
  `
})
export class AppComponent {
  file: EdiFile;

  constructor(private store: Store<{ file: EdiFile }>) {
    store.pipe(select('file')).subscribe((file: EdiFile) => this.file = file);
  }
}
