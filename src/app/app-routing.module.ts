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

const appRoutes: Routes = [
    { path: '', redirectTo: '/scriptures', pathMatch: 'full' },
    { path: 'scriptures', component: ScripturesComponent, children: [
        { path: '', component: ScriptureListComponent },
        { path: 'new', component: ScriptureFormComponent },
        { path: ':id', component: ScriptureNoteComponent },
        { path: ':id/edit', component: ScriptureFormComponent }
    ] },
    { path: 'general-conference', component: GeneralconferencesComponent, children: [
        { path: '', component: GeneralconferenceListComponent },
        { path: 'new', component: GeneralconferenceFormComponent },
        { path: ':id', component: GeneralconferenceNoteComponent },
        { path: ':id/edit', component: GeneralconferenceFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}