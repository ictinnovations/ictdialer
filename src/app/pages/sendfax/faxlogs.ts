export class Faxlogs {
    id : number;
    faxid : number;
    sourcename : string;
    sourcephone : string;
    destination : string;
    destinationname : string;
    faxlogs: any;
    faxstatus : string;
    duration : string;
    pending : string;
    processing : string;
    result : string;
    origin : string;
    date : Date;
    }


export class Faxactivity {
    id: number;
    faxid : number;
    faxactivity : string;
    date : Date;
    }