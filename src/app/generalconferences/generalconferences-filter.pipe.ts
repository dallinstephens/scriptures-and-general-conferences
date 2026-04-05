import { Pipe, PipeTransform } from '@angular/core';
import { Generalconference } from './generalconference.model';

@Pipe({
  name: 'generalconferencesFilter'
})
export class GeneralconferencesFilterPipe implements PipeTransform {
  transform(generalconferences: Generalconference[], term: string): any {
    let filteredGeneralconferences: Generalconference[] = [];

    if (term && term.length > 0) {
      filteredGeneralconferences = generalconferences.filter(
        (generalconference: Generalconference) => {
          return generalconference.generalconferenceSpeaker.toLowerCase().includes(term.toLowerCase()) ||
          generalconference.keywords.some(keyword => keyword.toLowerCase().includes(term.toLowerCase()));
        }
      );
    }

    if (filteredGeneralconferences.length < 1) {
      return generalconferences;
    }

    return filteredGeneralconferences;
  }
}
