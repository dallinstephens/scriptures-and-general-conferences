import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Generalconference } from '../generalconference.model';
import { GeneralconferenceService } from '../generalconference.service';

@Component({
  selector: 'app-generalconference-list',
  templateUrl: './generalconference-list.component.html',
  styleUrl: './generalconference-list.component.css'
})
export class GeneralconferenceListComponent implements OnInit, OnDestroy {
  generalconferences: Generalconference[] = [];
  private subscription!: Subscription;
  term: string = '';

  constructor(private generalconferenceService: GeneralconferenceService) {}

  ngOnInit() {
    this.generalconferenceService.getGeneralconferences();

    this.generalconferenceService.generalconferenceChangedEvent
      .subscribe(
        (generalconferences: Generalconference[]) => {
          this.generalconferences = generalconferences;
        }
      );
    this.subscription = this.generalconferenceService.generalconferenceListChangedEvent
      .subscribe(
        (generalconferences: Generalconference[]) => {
          this.generalconferences = generalconferences;
        }
      );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
