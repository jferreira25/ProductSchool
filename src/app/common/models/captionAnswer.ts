import { Person } from "./person";

export class CaptionAnswer {
    id: string;
    campaign: string;
    knowUs: string;
    interestedPeriod: string;
    interestedPack: string;
    typeMidiaContact: string;
    answerDateHour: Date;
    nextAnswerDateHour: Date;
    person: Person
  }