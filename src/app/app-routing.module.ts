import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ScripturesComponent } from "./scriptures/scriptures.component";
import { ScriptureFormComponent } from "./scriptures/scripture-form/scripture-form.component";
import { GcNoteComponent } from "./general-conference/gc-note/gc-note.component";
import { GeneralConferenceComponent } from "./general-conference/general-conference.component";
import { GcFormComponent } from "./general-conference/gc-form/gc-form.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/scriptures', pathMatch: 'full' },
    { path: 'scriptures', component: ScripturesComponent, children: [
        { path: 'new', component: ScriptureFormComponent },
        { path: ':id', component: GcNoteComponent },
        { path: ':id/edit', component: ScriptureFormComponent }
    ] },
    { path: 'general-conference', component: GeneralConferenceComponent, children: [
        { path: 'new', component: GcFormComponent },
        { path: ':id', component: GcNoteComponent },
        { path: ':id/edit', component: GcFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}