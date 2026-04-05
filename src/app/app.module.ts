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
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookNoteComponent } from './books/book-note/book-note.component';
import { BookRowComponent } from './books/book-row/book-row.component';
import { BooksFilterPipe } from './books/books-filter.pipe';
import { VideosComponent } from './videos/videos.component';
import { VideoFormComponent } from './videos/video-form/video-form.component';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoNoteComponent } from './videos/video-note/video-note.component';
import { VideoRowComponent } from './videos/video-row/video-row.component';
import { VideosFilterPipe } from './videos/videos-filter.pipe';

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
    GeneralconferencesFilterPipe,
    BooksComponent,
    BookFormComponent,
    BookListComponent,
    BookNoteComponent,
    BookRowComponent,
    BooksFilterPipe,
    VideosComponent,
    VideoFormComponent,
    VideoListComponent,
    VideoNoteComponent,
    VideoRowComponent,
    VideosFilterPipe
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
