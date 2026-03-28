import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';

@Component({
  selector: 'app-scripture-note',
  templateUrl: './scripture-note.component.html',
  styleUrl: './scripture-note.component.css'
})
export class ScriptureNoteComponent implements OnInit {
  // The value of the selectedScripture variable now needs to be passed down to the 
  // ScriptureNoteComponent as an input.
  scripture: Scripture;
  id: string;
  safeUrl: SafeResourceUrl;

  constructor(private scriptureService: ScriptureService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.scripture = this.scriptureService.getScripture(this.id);
        }
      );
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scripture.scriptureLink);
  }

  onDelete() {
    this.scriptureService.deleteScripture(this.scripture);
    this.router.navigateByUrl('/scriptures');
  }
}
