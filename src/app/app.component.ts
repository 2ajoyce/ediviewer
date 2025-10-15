import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdiFile } from './models/edi-file';
import { Store } from '@ngrx/store';
import { DndDirective } from './directives/dnd.directive';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DndDirective, FileViewerComponent],
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div appDnd>
      <div class="page">
        <h1>EDI Viewer</h1>
        @if (!file()) {
          <section>
            <p>Drop Your File Here</p>
          </section>
        }
        @if (file()) {
          <app-file-viewer [file]="file()!"></app-file-viewer>
        }
      </div>
    </div>
  `
})
export class AppComponent {
  file = signal<EdiFile | null>(null);

  constructor(private store: Store<{ file: EdiFile | null }>) {
    store.select('file').subscribe((file: EdiFile | null) => this.file.set(file));
  }
}
