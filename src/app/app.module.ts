import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DndDirective} from './directives/dnd.directive';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';
import {PadPipe} from './pipes/pad.pipe';
import {StoreModule} from '@ngrx/store';
import {fileReducer} from './file.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    FileViewerComponent,
    PadPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({file: fileReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
