import { RoleType } from "./role";

export class Register {

  userName: string;
  email: string;
  password: string;
  token: string;
  user: Register;
  rolename: string;

  
  role:RoleType;
}

// <table >
//             <tr>
//               <td>course_Id</td>
//               <td>coursecategory</td>
//               <td>coursestartdate</td>
//               <td>description</td>
//               <td>format</td>
//               <td>level</td>
//               <td>price</td>
//             </tr>
//             <tr *ngFor="let row of data">
//               <td>{{row.course_Id}}</td>
//               <td>{{row.coursecategory}}</td>
//               <td>{{row.coursestartdate}}</td>
//               <td>{{row.description}}</td>
//               <td>{{row.format}}</td>
//               <td>{{row.level}}</td>
//               <td>{{row.price}}</td>
//             </tr>
//           </table>
