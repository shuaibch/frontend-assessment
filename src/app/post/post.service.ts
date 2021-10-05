import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
    
import { Post } from './post';
     
@Injectable({
  providedIn: 'root'
})
export class PostService {
     
  private apiURL = "https://gorest.co.in/public/v1/";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 757e1cdec25b0f26611e5c84115c8b87d2d4e94e1802f29e39af18e220c77a6a` ,

    })
  }
   
  constructor(private http: HttpClient) { }

  getToken(){
  
    // const user:any = localStorage.getItem('user');
    // const userobj = JSON.parse(user);
    // console.log(userobj.token);
    const token = '757e1cdec25b0f26611e5c84115c8b87d2d4e94e1802f29e39af18e220c77a6a';
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` ,
    });
    // return CryptoES.AES.decrypt(localStorage.getItem('token').trim(), this.config.key.trim()).toString(CryptoES.enc.Utf8);
    return headers;
}
     
  getAll() {
    return this.http.get<Post[]>(this.apiURL + '/posts/')
    .pipe(map((data:any)=>data.data))
  }

  find(id:number): Observable<any> {
    return this.http.get(this.apiURL + '/posts/' + id)
    .pipe(map((data:any)=>data.data)
    )
  }

  create(post:Post): Observable<any> {

    return this.http.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(id:number, post:Post): Observable<any> {

    return this.http.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:number){
    return this.http.delete(this.apiURL + '/posts/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
  
}