import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { ScripturesComponent } from './scriptures/scriptures.component';
import { GeneralConferenceComponent } from './general-conference/general-conference.component';
import { ScriptureNoteComponent } from './scriptures/scripture-note/scripture-note.component';
import { GcNoteComponent } from './general-conference/gc-note/gc-note.component';
import { GcFormComponent } from './general-conference/gc-form/gc-form.component';
import { ScriptureFormComponent } from './scriptures/scripture-form/scripture-form.component';
import { ScriptureListComponent } from './scriptures/scripture-list/scripture-list.component';
import { GcListComponent } from './general-conference/gc-list/gc-list.component';
import { ScriptureRowComponent } from './scriptures/scripture-row/scripture-row.component';
import { GcRowComponent } from './general-conference/gc-row/gc-row.component';
import { ScripturesFilterPipe } from './scriptures/scriptures-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScripturesComponent,
    GeneralConferenceComponent,
    ScriptureNoteComponent,
    GcNoteComponent,
    GcFormComponent,
    ScriptureFormComponent,
    ScriptureListComponent,
    GcListComponent,
    ScriptureRowComponent,
    GcRowComponent,
    ScripturesFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
