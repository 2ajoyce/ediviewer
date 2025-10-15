import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileViewerComponent } from './file-viewer.component';
import { ComponentRef } from '@angular/core';

describe('FileViewerComponent', () => {
  let component: FileViewerComponent;
  let fixture: ComponentFixture<FileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FileViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileViewerComponent);
    component = fixture.componentInstance;
    
    // Set required input
    fixture.componentRef.setInput('file', {
      elementDelimiter: '*',
      componentSeparator: ':',
      segmentDelimiter: '~',
      elements: []
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
