import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndDirective } from './directives/dnd.directive';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { PadPipe } from './pipes/pad.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    FileViewerComponent,
    PadPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
