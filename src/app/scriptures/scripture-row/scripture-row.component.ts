import { Component, Input, OnInit } from '@angular/core';
import { Scripture } from '../scripture.model';
import { WindowRefService } from '../../window-ref.service';
import { ScriptureService } from '../scripture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scripture-row',
  templateUrl: './scripture-row.component.html',
  styleUrl: './scripture-row.component.css'
})
export class ScriptureRowComponent implements OnInit {
  @Input() scripture: Scripture;
  nativeWindow: any;

  constructor(
    private windowRefService: WindowRefService,
    private scriptureService: ScriptureService,
    private router: Router
  ) { }

  ngOnInit(){
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.scripture.scriptureLink) {
      this.nativeWindow.open(this.scripture.scriptureLink);
    }
  }

  onDelete() {
    this.scriptureService.deleteScripture(this.scripture);
    this.router.navigateByUrl('/scriptures');
  }
}
