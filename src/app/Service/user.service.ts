import { Injectable } from '@angular/core';
import {Product} from "../Model/Product";
import {catchError, retry, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.hostUrl + "/user";

  getUserDetails(email: string) {
    return this.http
      .get<Product[]>(this.apiUrl+'/getUserByEmail/'+ email , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
