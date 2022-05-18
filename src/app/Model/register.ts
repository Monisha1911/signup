import { RoleType } from "./role";

export class Register {

  userName: string;
  email: string;
  password: string;
  token: string;
  user: Register;
  rolename: string;  
  role:RoleType;
  roleType:string;

  constructor(userName , email , roleType){
    this.userName = userName;
    this.email=email;
    this.roleType=roleType;
  }
}

