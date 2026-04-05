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
import { GeneralconferencesComponent } from './generalconferences/generalconferences.component';
import { GeneralconferenceFormComponent } from './generalconferences/generalconference-form/generalconference-form.component';
import { GeneralconferenceListComponent } from './generalconferences/generalconference-list/generalconference-list.component';
import { GeneralconferenceNoteComponent } from './generalconferences/generalconference-note/generalconference-note.component';
import { GeneralconferenceRowComponent } from './generalconferences/generalconference-row/generalconference-row.component';
import { GeneralconferencesFilterPipe } from './generalconferences/generalconferences-filter.pipe';

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
    GeneralconferencesComponent,
    GeneralconferenceFormComponent,
    GeneralconferenceListComponent,
    GeneralconferenceNoteComponent,
    GeneralconferenceRowComponent,
    GeneralconferencesFilterPipe
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
