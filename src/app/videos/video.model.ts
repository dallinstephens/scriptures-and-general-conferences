export class Video {
    constructor(
        public id: string,
        public videoTitle: string,
        public keywords: string[],
        public videoYoutubeLink?: string,
        public youtubeStartTimeInSec?: string,
        public youtubeEndTimeInSec?: string,
        public videoSpeaker?: string,
        public videoImageLink?: string,
        public questionsOrTopics?: string[],
        public notes?: string[],
        public _id?: string,
        public attribution: string = 'Source: ChurchOfJesusChrist.org'
    ) { }
}