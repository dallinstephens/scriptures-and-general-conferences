import { Component, Input, OnInit } from '@angular/core';
import { Generalconference } from '../generalconference.model';
import { WindowRefService } from '../../window-ref.service';
import { GeneralconferenceService } from '../generalconference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generalconference-row',
  templateUrl: './generalconference-row.component.html',
  styleUrl: './generalconference-row.component.css'
})
export class GeneralconferenceRowComponent implements OnInit {
  @Input() generalconference!: Generalconference;
  nativeWindow: any;

  constructor(
    private windowRefService: WindowRefService,
    private generalconferenceService: GeneralconferenceService,
    private router: Router
  ) { }

  ngOnInit(){
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.generalconference.generalconferenceReadLink) {
      this.nativeWindow.open(this.generalconference.generalconferenceReadLink);
    }
  }

  onDelete() {
    this.generalconferenceService.deleteGeneralconference(this.generalconference);
    this.router.navigateByUrl('/general-conferences');
  }
}
