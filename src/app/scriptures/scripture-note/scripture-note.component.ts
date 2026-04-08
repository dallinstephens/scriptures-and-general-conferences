import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-scripture-note',
  templateUrl: './scripture-note.component.html',
  styleUrl: './scripture-note.component.css'
})
export class ScriptureNoteComponent implements OnInit {
  // The value of the selectedScripture variable now needs to be passed down to the 
  // ScriptureNoteComponent as an input.
  scripture!: Scripture;
  id!: string;
  safeUrl!: SafeResourceUrl;
  nativeWindow: any;
  editMode: boolean = false;

  constructor(private scriptureService: ScriptureService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private windowRefService: WindowRefService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.scripture = this.scriptureService.getScripture(this.id)!;
          if (this.scripture) {
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scripture.scriptureLink);
          }
        }
      );     
      this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.scripture.scriptureLink) {
      this.nativeWindow.open(this.scripture.scriptureLink);
    }
  }

  ngOnChange() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.scripture = this.scriptureService.getScripture(this.id)!;
          if (this.scripture) {
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scripture.scriptureLink);
          }
        }
      );    
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // documentElement targets the html tag
      document.documentElement.classList.add('show-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
    } else {
      document.documentElement.classList.add('hide-scrollbar');
      document.documentElement.classList.remove('show-scrollbar');      
    }
  }

  saveKeywordsAndNotes(updatedScripture: Scripture) {
    this.scripture = updatedScripture;
    this.toggleEdit();
  }

  onDelete() {
    this.scriptureService.deleteScripture(this.scripture);
    this.router.navigateByUrl('/scriptures');
  }
}
