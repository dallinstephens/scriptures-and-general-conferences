export class Book {
    constructor(
        public id: string,
        public bookName: string,
        public bookLink: string,
        public keywords: string[],
        public bookImageLink?: string,
        public questionsOrTopics?: string[],
        public notes?: string[],
        public _id?: string,
        public attribution: string = 'Source: ChurchOfJesusChrist.org'
    ) { }
}