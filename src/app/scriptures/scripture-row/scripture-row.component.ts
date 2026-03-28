import { Component, Input, OnInit } from '@angular/core';
import { Scripture } from '../scripture.model';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-scripture-row',
  templateUrl: './scripture-row.component.html',
  styleUrl: './scripture-row.component.css'
})
export class ScriptureRowComponent implements OnInit {
  @Input() scripture: Scripture;
  nativeWindow: any;

  constructor(private windowRefService: WindowRefService) { }

  ngOnInit(){
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.scripture.scriptureLink) {
      this.nativeWindow.open(this.scripture.scriptureLink);
    }
  }
}
