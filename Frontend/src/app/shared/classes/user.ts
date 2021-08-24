import { Organisme } from './organisme';
import { Gender } from './gender';
export class User {
    _id: string;
    reference?:string;
    nom?:string;
    prenom?:string;
    email?:string;
    gender?:Gender;
    gsm ?:string;
    role?: any;
   dateDeNaissance?:Date;
   streetAddress ?: string;
   organisme:Organisme
   province?:string;
   create_date:Date;
   update_date:Date;
   telValid?:boolean;
    password?:string;
  

}