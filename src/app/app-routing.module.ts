import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ScripturesComponent } from "./scriptures/scriptures.component";
import { ScriptureListComponent } from "./scriptures/scripture-list/scripture-list.component";
import { ScriptureFormComponent } from "./scriptures/scripture-form/scripture-form.component";
import { ScriptureNoteComponent } from "./scriptures/scripture-note/scripture-note.component";
import { GeneralConferencesComponent } from "./general-conferences/general-conferences.component";
import { GeneralConferenceFormComponent } from "./general-conferences/general-conference-form/general-conference-form.component";
import { GeneralConferenceNoteComponent } from "./general-conferences/general-conference-note/general-conference-note.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/scriptures', pathMatch: 'full' },
    { path: 'scriptures', component: ScripturesComponent, children: [
        { path: '', component: ScriptureListComponent },
        { path: 'new', component: ScriptureFormComponent },
        { path: ':id', component: ScriptureNoteComponent },
        { path: ':id/edit', component: ScriptureFormComponent }
    ] },
    { path: 'general-conferences', component: GeneralConferencesComponent, children: [
        { path: 'new', component: GeneralConferenceFormComponent },
        { path: ':id', component: GeneralConferenceNoteComponent },
        { path: ':id/edit', component: GeneralConferenceFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}