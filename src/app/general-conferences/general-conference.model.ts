export class GeneralConference {
    constructor(
        public id: string,
        public generalConferenceSpeaker: string,
        public generalConferenceReadLink: string,
        public keywords: string[],
        public generalConferenceYouTubeLink?: string,
        public generalConferenceMonthYear?: string,
        public generalConferenceTalkTitle?: string,
        public generalConferenceSpeakerImageLink?: string,
        public questionOrTopic?: string[],
        public note?: string[],
        public _id?: string
    ) { }
}