import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { Observable, throwError, Subscriber } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/shared/classes/role';
import { Socket } from 'ngx-socket-io';
import { CrudService } from '../api/generic.service';


const endpoint: string = environment.apiUrlauth;

@Injectable({
  providedIn: 'root'
})

export class AuthService  extends CrudService<User>{


  


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  auth:boolean=false

public   display: boolean = false;
constructor(protected readonly socket: Socket, protected readonly http: HttpClient,public router: Router) {

  super( http,endpoint,socket);

  

}

async verifyToken(){

  if(this.getToken()){ 
    let result=await this.http.post<any>(`${endpoint}/verifyToken`,{token:this.getToken()}).toPromise()
     if(result.status===false){ this.doLogout() }
  }
  let user
  user=JSON.parse(localStorage.getItem('currentUser'))
  if(user){
    let result=await this.http.post<any>(`${endpoint}/verifyUserBanned`, user).toPromise() 
    if(result.status ===false){ this.doLogout() }
  }

}


  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${endpoint}/signin`, user).toPromise()        
  }

  saveAfterAuth(userReqAuth){
    localStorage.setItem('access_token', userReqAuth.token)
    localStorage.setItem('role', userReqAuth.data.role)
    localStorage.setItem('id', userReqAuth.data._id)
    localStorage.setItem('currentUser', JSON.stringify(userReqAuth.data))
    
  }


  
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    return ((role !== null) && role==Role.Admin)
}
get isMedcin(): boolean {
  let role = localStorage.getItem('role');
  return ((role !== null) && role==Role.Medcin)
}
get isOrganisme(): boolean {
  let role = localStorage.getItem('role');
  return ((role !== null) && role==Role.Organisme)
}
get isSuperAdmin(): boolean {
  let role = localStorage.getItem('role');
  return ((role !== null) && role==Role.SuperAdmin)
}

get isPatient(): boolean {
  let role = localStorage.getItem('role');
  return ((role !== null) && role==Role.Patient)
}


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    localStorage.removeItem('id')
    localStorage.removeItem('currentUser')

    if (removeToken == null) {
      this.router.navigate(['/auth/login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    if(id){
    let api = `${endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }else {
    return null
  }
  }

  getUserProfileByEmail(email): Observable<any> {
    let api = `${endpoint}/user-profile-by-email/${email}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = ''
    this.auth=true
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}