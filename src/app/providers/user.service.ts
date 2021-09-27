import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://127.0.0.1:8080/users/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this.url)
      .pipe(map(data =>
        data.map((user: any) => new User(
          user.name,
          user.email,
          user.phone,
        ))
       )
      );
  }

  save(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post<User>(this.url, user, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  private handleError() : any {
    return throwError(
      'Ocorreu um erro. Tente novamente mais tarde.');
  }

}
