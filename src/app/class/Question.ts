import { Option } from './Option';
import { MapUserQuestionChoice } from './MapUserQuestionChoice';

export class Question{
    id:number;
    question:string="";
    fkPaperId:number;
    correctMark:number=4;
    wrongMark:number=0;
    fkLevel:number=1;
    fkCorrectChoice:number;
    opt :Option[]=new Array(4);
    choices:MapUserQuestionChoice=new MapUserQuestionChoice();
    
    seq:number;
    styleclass:string[] = ["btn-outline-primary", "fa-question"];
    isValid:boolean=false;
}