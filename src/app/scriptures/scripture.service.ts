import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Scripture } from './scripture.model';

@Injectable({
  providedIn: 'root'
})
export class ScriptureService {
  scriptureListChangedEvent = new Subject<Scripture[]>();
  scriptures: Scripture[] = [];
  scriptureSelectedEvent = new EventEmitter<Scripture>();
  scriptureChangedEvent = new EventEmitter<Scripture[]>();
  maxScriptureId: number;

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.scriptures.sort((a, b) => {
      if (a.scripturePassage < b.scripturePassage ) return -1;
      if (a.scripturePassage < b.scripturePassage ) return 1;
      return 0;
    });
    this.scriptureListChangedEvent.next(this.scriptures.slice());
  }  

  getScriptures(): void {
    // return this.scriptures.slice();
    this.http
      .get<{ message: string, scriptures: Scripture[] }>(
        'http://localhost:3000/scriptures'
        // 'https://dlscms-default-rtdb.firebaseio.com/scriptures.json'
      )
      .subscribe({ 
        next: (responses) => {
        // next: (scriptures: Scripture[]) => {
          this.scriptures = responses.scriptures || [];
          // this.scriptures = scriptures || [];
          this.maxScriptureId = this.getMaxId();
          // Reference for javascript sort array: https://www.w3schools.com/js/js_array_sort.asp
          this.scriptures.sort((a, b) => { 
            if (a.scripturePassage < b.scripturePassage) {
              return -1;
            } else if (a.scripturePassage > b.scripturePassage) {
              return 1;
            } else {
              return 0;
            }
          });
          let scripturesListClone = this.scriptures.slice();
          this.scriptureListChangedEvent.next(scripturesListClone);          
        },
        error: (error: any) => {
          console.log(error);
        }        
      })
  }

  getScripture(id: string): Scripture {
    for (let scripture of this.scriptures) {
      if (scripture.id === id) {
        return scripture;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let scripture of this.scriptures) {
      let currentId = +scripture.id;
      if (currentId > maxId) {
        maxId = currentId;        
      }
    } 
    
    return maxId;
  }

  addScripture(scripture: Scripture) {
    if (!scripture) {
      return;
    }

    // make sure id of new scripture is empty
    scripture.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string, scripture: Scripture }>(
        'http://localhost:3000/scriptures', 
        scripture,
        { headers: headers }
      )
      .subscribe(
        (responseData) => {
          // add new scriptures to scriptures
          this.scriptures.push(responseData.scripture);
          this.sortAndSend();
        }
      );
  }  

  updateScripture(originalScripture: Scripture, newScripture: Scripture) {
    if (!originalScripture || !newScripture) {
      return;
    }
    
    const pos = this.scriptures.findIndex(d => d.id === originalScripture.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Scripture to the id of the old scripture
    newScripture.id = originalScripture.id;
    newScripture._id = originalScripture._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/scriptures/' + originalScripture.id,
        newScripture,
        { headers: headers }
      )
      .subscribe(
        (response: Response) => {
          this.scriptures[pos] = newScripture;
          this.sortAndSend();
        }
      );
  }

  deleteScripture(scripture: Scripture) {
    if (!scripture) {
      return;
    }

    const pos = this.scriptures.findIndex(d => d.id === scripture.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/scriptures/' + scripture.id)
      .subscribe(
        (response: Response) => {
          this.scriptures.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
