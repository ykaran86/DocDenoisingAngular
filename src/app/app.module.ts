import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressBarModule, MatDialogModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import {
  FlexLayoutModule, StyleUtils, StylesheetMap, MediaMarshaller,
  ɵMatchMedia, BreakPointRegistry, PrintHook, LayoutStyleBuilder,
  FlexStyleBuilder, ShowHideStyleBuilder, FlexOrderStyleBuilder,
  LayoutAlignStyleBuilder
} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './services/upload.service';
import { UploadWindowComponent } from './home/upload-window/upload-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [UploadService,
    StyleUtils, StylesheetMap,
    MediaMarshaller, ɵMatchMedia, BreakPointRegistry,
    PrintHook, LayoutStyleBuilder, FlexStyleBuilder,
    ShowHideStyleBuilder, FlexOrderStyleBuilder, LayoutAlignStyleBuilder],
  bootstrap: [AppComponent],
  entryComponents: [UploadWindowComponent]
})
export class AppModule { }
