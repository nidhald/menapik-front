import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../Model/Product";
import {catchError, Observable, retry, throwError} from "rxjs";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.hostUrl + "/product";


  getProductList() {
    return this.http
      .get<Product[]>(this.apiUrl+'/getAllProduct' , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProductById(id: number){
    return this.http.get<Product>(this.apiUrl+'/findProduct/' + id, httpOptions);
  }

  // @ts-ignore
 deleteProduct(idP: number): Observable<Object>
  {
    return this.http.delete(this.apiUrl+'/deleteProduct/'+ idP, httpOptions);
  }


  updateProduct(id: number, product: any){
   // console.log(product.value)
   return this.http
     .put(this.apiUrl+'/updateProduct/' + id,product)
     .pipe(retry(1), catchError(this.handleError));
  }

  createProductWithFileUpload(formdata: any) {
    return this.http
      .post(this.apiUrl+"/addProduct", formdata)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadFile(fileName: string | undefined){
    return this.http.get(this.apiUrl+"/download/"+fileName, {
      responseType: 'blob'
    });
  }
  findProductByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/productName/"+name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductVector(){
    return this.http.get<Product[]>(this.apiUrl+"/vector")
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductPNG(){
    return this.http.get<Product[]>(this.apiUrl+"/png")
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductPDF(){
    return this.http.get<Product[]>(this.apiUrl+"/pdf")
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductSVG(){
    return this.http.get<Product[]>(this.apiUrl+"/svg")
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductEPS(){
    return this.http.get<Product[]>(this.apiUrl+"/eps")
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductICON(){
    return this.http.get<Product[]>(this.apiUrl+"/icon")
      .pipe(retry(1), catchError(this.handleError));
  }

  findProductVectorByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/vector/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductPngByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/png/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductPdfByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/pdf/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductSvgByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/svg/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductEpsByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/eps/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductIconByName(name: string){
    return this.http.get<Product[]>(this.apiUrl+"/icon/"+ name)
      .pipe(retry(1), catchError(this.handleError));
  }

/*  findProductByFormat(format : string[]){
    return this.http
      .get<Product[]>(this.apiUrl+'/productFormat/'+ format , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductByStyle(style : string[]){
    return this.http
      .get<Product[]>(this.apiUrl+'/productStyle/'+ style , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductByColor(color : string[]){
    return this.http
      .get<Product[]>(this.apiUrl+'/productColor/'+ color , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }*/
  findProductSameIllustration(color: string, format: string, style: string){
    return this.http
      .get<Product[]>(this.apiUrl+'/'+ color + '/'+format+'/'+style , httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findProductFilters(format : string[], style: string[], color: string[], category: string[]){
    return this.http
      .get<Product[]>(this.apiUrl+'/filters/'+ format + '/'+style+'/'+color+'/'+category , httpOptions)
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
    //console.log(errorMessage);
    return throwError(errorMessage);
  }

}
