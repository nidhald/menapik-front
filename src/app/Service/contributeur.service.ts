import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Contributeur} from "../Model/Contributeur";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ContributeurService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.hostUrl + "/contributor";


  getContributeurList() {
    return this.http
      .get<Contributeur[]>(this.apiUrl+'/getAllContribute' , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  addContributeur(formdata: any) {
    return this.http
      .post(this.apiUrl+"/addContribute", formdata)
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
