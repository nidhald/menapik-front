import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.hostUrl + "/v1";
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/signup',
      {
        name,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl + '/signout', { }, httpOptions);
  }


}
