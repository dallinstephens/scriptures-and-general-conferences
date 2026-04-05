import { Component, OnInit } from '@angular/core';
import { Generalconference } from './generalconference.model';
import { GeneralconferenceService } from './generalconference.service';

@Component({
  selector: 'app-generalconferences',
  templateUrl: './generalconferences.component.html',
  styleUrl: './generalconferences.component.css'
})
export class GeneralconferencesComponent implements OnInit {
  selectedGeneralconference!: Generalconference;

  constructor(private generalconferenceService: GeneralconferenceService) {}

  ngOnInit() {
    this.generalconferenceService.generalconferenceSelectedEvent
      .subscribe(
        (generalconference: Generalconference) => {
          this.selectedGeneralconference = generalconference;
        }
      );
  }
}
