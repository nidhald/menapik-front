import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../Service/product.service";
import {Router} from "@angular/router";
import {StorageService} from "../../../Service/StorageService";

@Component({
  selector: 'app-galerie-with-filter',
  templateUrl: './galerie-with-filter.component.html',
  styleUrls: ['./galerie-with-filter.component.css']
})
export class GalerieWithFilterComponent implements OnInit {
  isLoggedIn = false;
  filteredProduct: Product[] = [];
  licenceArray: string[] = [];
  formatArray: string[] = [];
  allFormatArray: string[] = ["Paysage", "Carré", "Portrait"];
  allColorArray: string[] = ["Red", "Yellow", "Green", "Blue", "Orange"];
  allStyleArray: string[] = ["Caligraphie", "Flat design", "Line Art", "icon", "Cartoon", "Metro Design", "Mockups", "User interface", "Affiches bannières", "Image Photographie"]
  allCategoryArray: string[] = ["vecteur", "icon", "eps", "png", "svg", "pdf"]
  categoryArray: string[] = [];
  colorArray: string[] = [];
  styleArray: string[] = [];
  formatValue: string = "";
  searchText: string = "";
  searchCategory: string = "";
  counter: number = 0;
  hoverIdx = -1;
  public Products: Product[] = [];
  licence = [
    {Id: 2, Name: "Gratuit", val: "Gratuit"},
    {Id: 3, Name: "Premium", val: "Premium"},
  ];
  format = [
    {Id: 2, Name: "Paysage", val: "Paysage"},
    {Id: 3, Name: "Carré", val: "Carré"},
    {Id: 4, Name: "Portrait", val: "Portrait"},
  ];
  category = [
    {Id: 2, Name: "vecteur", val: "vecteur"},
    {Id: 3, Name: "PDF", val: "pdf"},
    {Id: 4, Name: "ICON", val: "icon"},
    {Id: 5, Name: "EPS", val: "eps"},
    {Id: 6, Name: "SVG", val: "svg"},
    {Id: 7, Name: "PNG", val: "png"},
  ];
  couleur = [
    {Id: 1, Name: "Red", val: "Red"},
    {Id: 2, Name: "Yellow", val: "Yellow"},
    {Id: 3, Name: "Green", val: "Green"},
    {Id: 4, Name: "Blue", val: "Blue"},
    {Id: 5, Name: "Orange", val: "Orange"},
  ];
  styles = [
    {Id: 1, Name: "Caligraphie", val: "Caligraphie"},
    {Id: 2, Name: "Flat design", val: "Flat design"},
    {Id: 3, Name: "Line Art", val: "Line Art"},
    {Id: 4, Name: "Style 3D", val: "Icon"},
    {Id: 5, Name: "Cartoon", val: "Cartoon"},
    {Id: 6, Name: "Metro Design", val: "Metro Design"},
    {Id: 7, Name: "Mockups", val: "Mockups"},
    {Id: 8, Name: "User interface", val: "User interface"},
    {Id: 9, Name: "Affiches, bannières", val: "Affiches bannières"},
    {Id: 10, Name: "Images photographiées", val: "Image Photographie"},
  ]

  absoluteUrl: string = "http://localhost:8080/upload/static/images/products/";
  cp: number;

  constructor(private productService: ProductService, private router: Router, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/signin']);
    } else {
      this.getProducts();
    }
  }

  onSearchTextEntered(searchValue: string[]) {
    this.searchText = searchValue[0];
    this.searchCategory = searchValue[1];
    if (this.searchText != '') {
      if (this.searchCategory === '') {
        this.productService.findProductByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'vecteur')) {
        this.productService.findProductVectorByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'pdf')) {
        this.productService.findProductPdfByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'icon')) {
        this.productService.findProductIconByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'eps')) {
        this.productService.findProductEpsByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'svg')) {
        this.productService.findProductSvgByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'png')) {
        this.productService.findProductPngByName(this.searchText).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
    }

    if (this.searchText === '') {
      if (this.counter === 0) {
        this.productService.getProductList().subscribe(data => {
          this.Products = data;
          for (let i = 0; i < this.Products.length; i++) {
            this.Products[i].imageP = this.absoluteUrl + this.Products[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'vecteur')) {
        this.productService.findProductVector().subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'pdf')) {
        this.productService.findProductPDF().subscribe(data => {
          this.filteredProduct = data;

          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'icon')) {
        this.productService.findProductICON().subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'eps')) {
        this.productService.findProductEPS().subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'svg')) {
        this.productService.findProductSVG().subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'png')) {
        this.productService.findProductPNG().subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }

    } else {
      this.getProducts();
    }
  }

  private getProducts() {
    if (this.counter === 0){
      this.productService.getProductList().subscribe(data => {
        this.Products = data;
        for (let i = 0; i< this.Products.length ; i++){
          this.Products[i].imageP =  this.absoluteUrl+this.Products[i].imageP;
        }
      });
    }else {
      this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
        this.Products = data;
        console.log(this.counter)
        for (let i = 0; i < this.Products.length; i++) {
          this.Products[i].imageP = this.absoluteUrl + this.Products[i].imageP;
        }
      });
    }

  }

  getProduct(id: number) {
    this.router.navigate(['details', id]);
  }

  getStyleValue(value: string, event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      this.styleArray.push(value);
      this.counter = this.counter + 1;
      //console.log(this.counter);
      this.allStyleArray = this.styleArray;
      this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

        this.filteredProduct = data;
        for (let i = 0; i < this.filteredProduct.length; i++) {
          this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
        }
      })
    }
    // @ts-ignore
    if (!event.target.checked) {
      // @ts-ignore
      const index = this.styleArray.indexOf(value);
      this.styleArray.splice(index, 1);
      this.counter = this.counter - 1;
      //console.log(this.counter);
      this.allStyleArray = this.styleArray;
      if (this.styleArray.length > 0) {
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if (this.styleArray.length == 0) {
        this.allStyleArray = ["Caligraphie", "Flat design", "Line Art", "icon", "Cartoon", "Metro Design", "Mockups", "User interface", "Affiches bannières", "Image Photographie"];
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      //console.log(this.styleArray)
    }
  }

  getFormatValue(value: string, event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      this.formatArray.push(value);
      this.counter = this.counter + 1;
      this.allFormatArray = this.formatArray;
      this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

        this.filteredProduct = data;
        for (let i = 0; i < this.filteredProduct.length; i++) {
          this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
        }
      })
    }
    // @ts-ignore
    if (!event.target.checked) {
      // @ts-ignore
      const index = this.formatArray.indexOf(value);
      this.formatArray.splice(index, 1);
      this.counter = this.counter - 1;
      this.allFormatArray = this.formatArray;
      if (this.formatArray.length > 0) {
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if (this.formatArray.length === 0) {
        this.allFormatArray = ["Paysage", "Carré", "Portrait"];

        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }

    }
  }

  getColorValue(value: string, event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      this.colorArray.push(value);
      this.counter = this.counter + 1;
      this.allColorArray = this.colorArray;
      this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

        this.filteredProduct = data;
        for (let i = 0; i < this.filteredProduct.length; i++) {
          this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
        }
      })
    }
    // @ts-ignore
    if (!event.target.checked) {
      // @ts-ignore
      const index = this.colorArray.indexOf(value);
      this.colorArray.splice(index, 1);
      this.counter = this.counter - 1;
      this.allColorArray = this.colorArray;
      if (this.colorArray.length > 0) {
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if (this.colorArray.length === 0) {
        this.allColorArray = ["Red", "Yellow", "Green", "Blue", "Orange"];
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
    }
  }

  getCategoryValue(value: string, event: Event) {

    // @ts-ignore
    if (event.target.checked) {
      this.categoryArray.push(value);
      this.counter = this.counter + 1;
      //console.log(this.counter)
      //console.log(this.categoryArray)
      //console.log(this.counter)
      if (this.categoryArray.indexOf("vecteur") != -1) {

        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
          ////console.log("this.filteredProduct == " + this.filteredProduct.length);
        })
      }
      if (this.categoryArray.indexOf("icon") != -1) {
        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
          ////console.log("this.filteredProduct == " + this.filteredProduct.length);
        })
      }
      if (this.categoryArray.indexOf("eps") != -1) {

        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
          ////console.log("this.filteredProduct == " + this.filteredProduct.length);
        })
      }
      if (this.categoryArray.indexOf("svg") != -1) {

        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
          ////console.log("this.filteredProduct == " + this.filteredProduct.length);
        })
      }
      if (this.categoryArray.indexOf("png") != -1) {

        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
          ////console.log("this.filteredProduct == " + this.filteredProduct.length);
        })
      }
      if (this.categoryArray.indexOf("pdf") != -1) {
        this.allCategoryArray = this.categoryArray;
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {
          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
    }
    // @ts-ignore
    /* if ( !event.target.checked ) {
       // @ts-ignore
       const index =  this.categoryArray.indexOf(value);
       this.categoryArray.splice(index, 1);
       this.counter = this.counter -1;

       this.allCategoryArray = this.categoryArray;
       console.log(this.counter);
       if (this.categoryArray.length == 0){
        // this.allStyleArray  = ["Caligraphie","Flat design","Line Art","icon","Cartoon","Metro Design"];
         this.productService.findProductFilters(this.allFormatArray,this.allStyleArray, this.allColorArray,this.allCategoryArray).subscribe( data =>{

           this.filteredProduct = data;
           for (let i = 0; i< this.filteredProduct.length ; i++){
             this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
           }
         })
       }*/
    /*      if (this.counter > 0){
          if (this.categoryArray.indexOf( "vector") != -1)
          {

            this.productService.findProductVector().subscribe( data =>{
              this.filteredProduct =  data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
              ////console.log("this.filteredProduct == " + this.filteredProduct.length);
            })
          }
          if (this.categoryArray.indexOf("icon") != -1)
          {
            this.productService.findProductICON().subscribe( data =>{
              this.filteredProduct = data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
              ////console.log("this.filteredProduct == " + this.filteredProduct.length);
            })
          }
          if (this.categoryArray.indexOf("eps") != -1)
          {

            this.productService.findProductEPS().subscribe( data =>{
              this.filteredProduct = data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
              ////console.log("this.filteredProduct == " + this.filteredProduct.length);
            })
          }
          if (this.categoryArray.indexOf("svg")  != -1)
          {

            this.productService.findProductSVG().subscribe( data =>{
              this.filteredProduct = data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
              ////console.log("this.filteredProduct == " + this.filteredProduct.length);
            })
          }
          if (this.categoryArray.indexOf("png") != -1)
          {

            this.productService.findProductPNG().subscribe( data =>{
              this.filteredProduct = data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
              ////console.log("this.filteredProduct == " + this.filteredProduct.length);
            })
          }
          if (this.categoryArray.indexOf("pdf") != -1)
          {
            this.productService.findProductPDF().subscribe( data =>{
              this.filteredProduct = data;
              for (let i = 0; i< this.filteredProduct.length ; i++){
                this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
              }
            })
          })
          }*/
    //  }
    // @ts-ignore
    if (!event.target.checked) {
      // @ts-ignore
      const index = this.categoryArray.indexOf(value);
      this.categoryArray.splice(index, 1);
      this.counter = this.counter - 1;
      this.allCategoryArray = this.categoryArray;
      if (this.categoryArray.length > 0) {
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
      if (this.categoryArray.length === 0) {
        this.allCategoryArray = ["vecteur", "icon", "eps", "png", "svg", "pdf"];
        this.productService.findProductFilters(this.allFormatArray, this.allStyleArray, this.allColorArray, this.allCategoryArray).subscribe(data => {

          this.filteredProduct = data;
          for (let i = 0; i < this.filteredProduct.length; i++) {
            this.filteredProduct[i].imageP = this.absoluteUrl + this.filteredProduct[i].imageP;
          }
        })
      }
    }

  }

  getLicenceValue(value: string, event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      // @ts-ignore
      this.licenceArray.push(value);
    }
    // @ts-ignore
    if (!event.target.checked) {
      // @ts-ignore
      const index = this.licenceArray.indexOf(value);
      this.licenceArray.splice(index, 1);

    }
  }

}
