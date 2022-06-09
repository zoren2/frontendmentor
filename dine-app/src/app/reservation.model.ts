export class Reservation {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public date?: Date,
        public hour?: number,
        public minute?: number,
        public meridiem?: string,
        public month?: string,
        public day?: string,
        public year?: number
    ) { }

}