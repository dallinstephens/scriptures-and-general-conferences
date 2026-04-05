import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';

@Component({
  selector: 'app-scripture-list',
  templateUrl: './scripture-list.component.html',
  styleUrl: './scripture-list.component.css'
})
export class ScriptureListComponent implements OnInit, OnDestroy {
  scriptures: Scripture[] = [];
  private subscription!: Subscription;
  term: string = '';

  constructor(private scriptureService: ScriptureService) {}

  ngOnInit() {
    this.scriptureService.getScriptures();

    this.scriptureService.scriptureChangedEvent
      .subscribe(
        (scriptures: Scripture[]) => {
          this.scriptures = scriptures;
        }
      );
    this.subscription = this.scriptureService.scriptureListChangedEvent
      .subscribe(
        (scriptures: Scripture[]) => {
          this.scriptures = scriptures;
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
