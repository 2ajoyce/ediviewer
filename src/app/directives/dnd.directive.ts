import { Directive, signal, inject } from '@angular/core';
import { FileParserService } from '../services/file-parser.service';
import { EdiFile } from '../models/edi-file';
import { Store } from '@ngrx/store';
import { Drop } from '../file.actions';

@Directive({
  selector: '[appDnd]',
  host: {
    '[class.dark]': 'dragover()',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)'
  }
})
export class DndDirective {
  private readonly fileParser = inject(FileParserService);
  private readonly store = inject(Store<{ file: EdiFile | null }>);
  
  dragover = signal(false);

  static removeDragData(evt: DragEvent): void {
    if (evt.dataTransfer?.items) {
      evt.dataTransfer.items.clear();
    } else if (evt.dataTransfer) {
      evt.dataTransfer.clearData();
    }
  }

  onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover.set(true);
  }

  onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover.set(false);
  }

  onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover.set(false);

    if (evt.dataTransfer?.items) {
      if (evt.dataTransfer.items[0].kind === 'file') {
        const file = evt.dataTransfer.items[0].getAsFile();
        if (file) {
          this.fileParser.read(file).subscribe((ediFile: EdiFile | null) => {
            if (ediFile) {
              this.store.dispatch(new Drop(ediFile));
            }
          });
        }
      }
    }

    DndDirective.removeDragData(evt);
  }
}
