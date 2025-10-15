import { DndDirective } from './dnd.directive';
import { TestBed } from '@angular/core/testing';
import { FileParserService } from '../services/file-parser.service';
import { provideStore, Store } from '@ngrx/store';
import { fileReducer } from '../file.reducer';
import { EdiFile } from '../models/edi-file';

describe('DndDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        FileParserService,
        provideStore({ file: fileReducer })
      ]
    });

    const fileParser = TestBed.inject(FileParserService);
    const store = TestBed.inject(Store) as Store<{ file: EdiFile | null }>;
    const directive = new DndDirective(fileParser, store);
    expect(directive).toBeTruthy();
  });
});
