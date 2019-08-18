export class MapUserQuestionChoice{
    id:number;
    fkUser:number;
    fkPaper:number;
    fkQuestion:number;
    fkChoice:number;
    isCorrect:boolean;
    marks:number;
}