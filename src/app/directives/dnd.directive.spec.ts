import { DndDirective } from './dnd.directive';
import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { fileReducer } from '../file.reducer';

describe('DndDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        DndDirective,
        provideStore({ file: fileReducer })
      ]
    });

    const directive = TestBed.inject(DndDirective);
    expect(directive).toBeTruthy();
  });
});
