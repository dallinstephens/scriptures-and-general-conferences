import { Pipe, PipeTransform } from '@angular/core';
import { Scripture } from './scripture.model';

@Pipe({
  name: 'scripturesFilter'
})
export class ScripturesFilterPipe implements PipeTransform {
  transform(scriptures: Scripture[], term: string): any {
    let filteredScriptures: Scripture[] = [];

    if (term && term.length > 0) {
      filteredScriptures = scriptures.filter(
        (scripture: Scripture) => scripture.scripturePassage.toLowerCase().includes(term.toLowerCase())   
      );
    }

    if (filteredScriptures.length < 1) {
      return scriptures;
    }

    return filteredScriptures;
  }
}
