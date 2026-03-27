import { Component, Input } from '@angular/core';
import { Scripture } from '../scripture.model';

@Component({
  selector: 'app-scripture-row',
  templateUrl: './scripture-row.component.html',
  styleUrl: './scripture-row.component.css'
})
export class ScriptureRowComponent {
  @Input() scripture: Scripture;
}
