import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Contributeur} from "../Model/Contributeur";
import {catchError, retry, throwError} from "rxjs";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.hostUrl + "/category";


  getAllCategory() {
    return this.http
      .get<Contributeur[]>(this.apiUrl+'/getAllCategory' , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCategoriesByName(categories: string[]) {
    return this.http
      .get<Contributeur[]>(this.apiUrl+'/categories/'+ categories , httpOptions)
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
