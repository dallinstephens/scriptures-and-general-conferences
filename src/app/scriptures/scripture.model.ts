export class Scripture {
    constructor(
        public id: string,
        public scripturePassage: string,
        public scriptureLink: string,
        public keywords: string[],
        public scriptureImageLink?: string,
        public questionsOrTopics?: string[],
        public notes?: string[],
        public _id?: string,
        public attribution: string = 'Source: ChurchOfJesusChrist.org'
    ) { }
}