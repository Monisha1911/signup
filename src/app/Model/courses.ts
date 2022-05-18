import { MatButton } from "@angular/material/button";

export class Courses {
    course_Id:number;
    coursecategory:string;
    coursestartdate:Date;
    description:string;
    format:string;
    level:string;
    price:number;
    Action:MatButton;

    constructor(course_Id , coursecategory,coursestartdate,description,format,level,price,Action){
        this.course_Id = course_Id;
        this.coursecategory=coursecategory;
        this.coursestartdate=coursestartdate;
        this.description=description;
        this.format=format;
        this.level=level;
        this.price=price;
        this.Action=Action;





    }
}


