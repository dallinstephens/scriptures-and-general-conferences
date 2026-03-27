export class Scripture {
    constructor(
        public id: string,
        public scripturePassage: string,
        public scriptureLink: string,
        public keywords: string[],
        public scriptureImageLink?: string,
        public note?: string,
        public _id?: string,
    ) { }
}