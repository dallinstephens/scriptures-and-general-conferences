export class Generalconference {
    constructor(
        public id: string,
        public generalconferenceSpeaker: string,
        public generalconferenceReadLink: string,
        public paragraphToJumpToLink: string,
        public keywords: string[],
        public generalconferenceYoutubeLink?: string,
        public youtubeStartTimeInSec?: string,
        public youtubeEndTimeInSec?: string,
        public generalconferenceMonthYear?: string,
        public generalconferenceTalkTitle?: string,
        public generalconferenceSpeakerImageLink?: string,
        public questionsOrTopics?: string[],
        public notes?: string[],
        public _id?: string,
        public attribution: string = 'Source: ChurchOfJesusChrist.org'
    ) { }
}