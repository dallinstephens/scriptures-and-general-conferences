import { Component, OnInit } from '@angular/core';
import { Scripture } from './scripture.model';
import { ScriptureService } from './scripture.service';

@Component({
  selector: 'cms-scriptures',
  templateUrl: './scriptures.component.html',
  styleUrl: './scriptures.component.css'
})
export class ScripturesComponent implements OnInit {
  selectedScripture: Scripture;

  constructor(private scriptureService: ScriptureService) {}

  ngOnInit() {
    this.scriptureService.scriptureSelectedEvent
      .subscribe(
        (scripture: Scripture) => {
          this.selectedScripture = scripture;
        }
      );
  }
}
