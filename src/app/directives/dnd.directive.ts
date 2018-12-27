import {Directive, HostBinding, HostListener} from '@angular/core';
import {FileParserService} from '../services/file-parser.service';
import {EdiFile} from '../models/edi-file';
import {Store} from '@ngrx/store';
import {Drop} from '../file.actions';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  dragover: boolean = false;

  constructor(
    private fileParser: FileParserService,
    private store: Store<{ file: EdiFile }>) {
  }

  @HostBinding('class')
  get elementClass(): string {
    return this.dragover ? 'dark' : '';
  }

  static removeDragData(evt) {
    if (evt.dataTransfer.items) {
      evt.dataTransfer.items.clear();
    } else {
      evt.dataTransfer.clearData();
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = false;

    if (evt.dataTransfer.items) {
      if (evt.dataTransfer.items[0].kind === 'file') {
        const file = evt.dataTransfer.items[0].getAsFile();
        this.fileParser.read(file).subscribe((ediFile: EdiFile) => {
          this.store.dispatch(new Drop(ediFile));
        });
      }
    }

    DndDirective.removeDragData(evt);
  }
}
