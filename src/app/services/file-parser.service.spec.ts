import { TestBed, inject } from '@angular/core/testing';

import { FileParserService } from './file-parser.service';

describe('FileParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileParserService]
    });
  });

  it('should be created', inject([FileParserService], (service: FileParserService) => {
    expect(service).toBeTruthy();
  }));
});
