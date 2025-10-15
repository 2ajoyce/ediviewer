import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdiFile } from '../../models/edi-file';
import { PadPipe } from '../../pipes/pad.pipe';

@Component({
  selector: 'app-file-viewer',
  imports: [CommonModule, PadPipe],
  styleUrls: ['./file-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="bold">Element Delimiter:</span> {{ file().elementDelimiter }}<br>
    <span class="bold">Component Separator:</span> {{ file().componentSeparator}}<br>
    <span class="bold">Segment Delimiter:</span> {{ file().segmentDelimiter}}<br>
    @for (ediElement of file().elements; track ediElement.ref + '-' + ediElement.index) {
      <div>
        <span class="bold">
          {{ ediElement.ref }}-{{ ediElement.index.toString() | pad: 2 }} :
        </span>
        <span>{{ ediElement.data }}</span>
      </div>
    }
  `
})
export class FileViewerComponent {
  file = input.required<EdiFile>();
}
