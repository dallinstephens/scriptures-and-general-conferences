import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { ScripturesComponent } from './scriptures/scriptures.component';
import { ScriptureNoteComponent } from './scriptures/scripture-note/scripture-note.component';
import { ScriptureFormComponent } from './scriptures/scripture-form/scripture-form.component';
import { ScriptureListComponent } from './scriptures/scripture-list/scripture-list.component';
import { ScriptureRowComponent } from './scriptures/scripture-row/scripture-row.component';
import { ScripturesFilterPipe } from './scriptures/scriptures-filter.pipe';
import { GeneralConferencesComponent } from './general-conferences/general-conferences.component';
import { GeneralConferenceFormComponent } from './general-conferences/general-conference-form/general-conference-form.component';
import { GeneralConferenceListComponent } from './general-conferences/general-conference-list/general-conference-list.component';
import { GeneralConferenceNoteComponent } from './general-conferences/general-conference-note/general-conference-note.component';
import { GeneralConferenceRowComponent } from './general-conferences/general-conference-row/general-conference-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScripturesComponent,
    ScriptureNoteComponent,
    ScriptureFormComponent,
    ScriptureListComponent,
    ScriptureRowComponent,
    ScripturesFilterPipe,
    GeneralConferencesComponent,
    GeneralConferenceFormComponent,
    GeneralConferenceListComponent,
    GeneralConferenceNoteComponent,
    GeneralConferenceRowComponent
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
