import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ScripturesComponent } from "./scriptures/scriptures.component";
import { ScriptureListComponent } from "./scriptures/scripture-list/scripture-list.component";
import { ScriptureFormComponent } from "./scriptures/scripture-form/scripture-form.component";
import { ScriptureNoteComponent } from "./scriptures/scripture-note/scripture-note.component";
import { GeneralconferencesComponent } from "./generalconferences/generalconferences.component";
import { GeneralconferenceListComponent } from "./generalconferences/generalconference-list/generalconference-list.component";
import { GeneralconferenceFormComponent } from "./generalconferences/generalconference-form/generalconference-form.component";
import { GeneralconferenceNoteComponent } from "./generalconferences/generalconference-note/generalconference-note.component";
import { BooksComponent } from "./books/books.component";
import { BookListComponent } from "./books/book-list/book-list.component";
import { BookFormComponent } from "./books/book-form/book-form.component";
import { BookNoteComponent } from "./books/book-note/book-note.component";
import { VideosComponent } from "./videos/videos.component";
import { VideoListComponent } from "./videos/video-list/video-list.component";
import { VideoFormComponent } from "./videos/video-form/video-form.component";
import { VideoNoteComponent } from "./videos/video-note/video-note.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/scriptures', pathMatch: 'full' },
    { path: 'scriptures', component: ScripturesComponent, children: [
        { path: '', component: ScriptureListComponent },
        { path: 'new', component: ScriptureFormComponent },
        { path: ':id', component: ScriptureNoteComponent },
        { path: ':id/edit', component: ScriptureFormComponent }
    ]},
    { path: 'general-conferences', component: GeneralconferencesComponent, children: [
        { path: '', component: GeneralconferenceListComponent },
        { path: 'new', component: GeneralconferenceFormComponent },
        { path: ':id', component: GeneralconferenceNoteComponent },
        { path: ':id/edit', component: GeneralconferenceFormComponent }
    ]},
    { path: 'books', component: BooksComponent, children: [
        { path: '', component: BookListComponent },
        { path: 'new', component: BookFormComponent },
        { path: ':id', component: BookNoteComponent },
        { path: ':id/edit', component: BookFormComponent }
    ]},
    { path: 'videos', component: VideosComponent, children: [
        { path: '', component: VideoListComponent },
        { path: 'new', component: VideoFormComponent },
        { path: ':id', component: VideoNoteComponent },
        { path: ':id/edit', component: VideoFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}