import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Generalconference } from './generalconference.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralconferenceService {
  generalconferenceListChangedEvent = new Subject<Generalconference[]>();
  generalconferences: Generalconference[] = [];
  generalconferenceSelectedEvent = new EventEmitter<Generalconference>();
  generalconferenceChangedEvent = new EventEmitter<Generalconference[]>();
  maxGeneralconferenceId!: number;

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.generalconferences.sort((a, b) => {
      if (a.generalconferenceSpeaker < b.generalconferenceSpeaker ) return -1;
      if (a.generalconferenceSpeaker < b.generalconferenceSpeaker ) return 1;
      return 0;
    });
    this.generalconferenceListChangedEvent.next(this.generalconferences.slice());
  }  

  getGeneralconferences(): void {
    // return this.generalconferences.slice();
    this.http
      .get<{ message: string, generalconferences: Generalconference[] }>(
        'http://localhost:3000/general-conferences'
        // 'https://dlscms-default-rtdb.firebaseio.com/generalconferences.json'
      )
      .subscribe({ 
        next: (responses) => {
        // next: (generalconferences: Generalconference[]) => {
          this.generalconferences = responses.generalconferences || [];
          // this.generalconferences = generalconferences || [];
          this.maxGeneralconferenceId = this.getMaxId();
          // Reference for javascript sort array: https://www.w3schools.com/js/js_array_sort.asp
          this.generalconferences.sort((a, b) => { 
            if (a.generalconferenceSpeaker < b.generalconferenceSpeaker) {
              return -1;
            } else if (a.generalconferenceSpeaker > b.generalconferenceSpeaker) {
              return 1;
            } else {
              return 0;
            }
          });
          let generalconferencesListClone = this.generalconferences.slice();
          this.generalconferenceListChangedEvent.next(generalconferencesListClone);          
        },
        error: (error: any) => {
          console.log(error);
        }        
      })
  }

  getGeneralconference(id: string): Generalconference | null {
    for (let generalconference of this.generalconferences) {
      if (generalconference.id === id) {
        return generalconference;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let generalconference of this.generalconferences) {
      let currentId = +generalconference.id;
      if (currentId > maxId) {
        maxId = currentId;        
      }
    } 
    
    return maxId;
  }

  addGeneralconference(generalconference: Generalconference) {
    if (!generalconference) {
      return;
    }

    // make sure id of new generalconference is empty
    generalconference.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string, generalconference: Generalconference }>(
        'http://localhost:3000/general-conferences', 
        generalconference,
        { headers: headers }
      )
      .subscribe(
        (responseData) => {
          // add new generalconferences to generalconferences
          this.generalconferences.push(responseData.generalconference);
          this.sortAndSend();
        }
      );
  }  

  updateGeneralconference(originalGeneralconference: Generalconference, newGeneralconference: Generalconference) {
    if (!originalGeneralconference || !newGeneralconference) {
      return;
    }
    
    const pos = this.generalconferences.findIndex(d => d.id === originalGeneralconference.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Generalconference to the id of the old generalconference
    newGeneralconference.id = originalGeneralconference.id;
    newGeneralconference._id = originalGeneralconference._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/general-conferences/' + originalGeneralconference.id,
        newGeneralconference,
        { headers: headers }
      )
      .subscribe(
        () => {
          this.generalconferences[pos] = newGeneralconference;
          this.sortAndSend();
        }
      );
  }

  deleteGeneralconference(generalconference: Generalconference) {
    if (!generalconference) {
      return;
    }

    const pos = this.generalconferences.findIndex(d => d.id === generalconference.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/general-conferences/' + generalconference.id)
      .subscribe(
        () => {
          this.generalconferences.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
