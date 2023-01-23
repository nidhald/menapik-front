import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../Service/product.service";
import {Router} from "@angular/router";
import {data} from "jquery";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  filteredProduct : Product[] = [];
  searchText: string  = "";
  searchCategory: string = "";
  hoverIdx = -1;
  public Products: Product[] = [];

  absoluteUrl: string = "http://localhost:8080/upload/static/images/products/";
  cp: number;
  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  onSearchTextEntered(searchValue: string[]){
    this.searchText = searchValue[0];
    this.searchCategory = searchValue[1];
    if (this.searchText != '')
    {
      if (this.searchCategory === ''){
      this.productService.findProductByName(this.searchText).subscribe(data =>{
        this.filteredProduct = data;
        for (let i = 0; i< this.filteredProduct.length ; i++){
          this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
        }
      })
    }
      if ((this.searchCategory === 'vector')){
        this.productService.findProductVectorByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'pdf')){
        this.productService.findProductPdfByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'icon')){
        this.productService.findProductIconByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'eps')){
        this.productService.findProductEpsByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'svg')){
        this.productService.findProductSvgByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'png')){
        this.productService.findProductPngByName(this.searchText).subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }

    }

    if (this.searchText === '')
    {
      if (this.searchCategory === ''){
        this.productService.getProductList().subscribe(data =>{
          this.Products = data;
          for (let i = 0; i< this.Products.length ; i++){
            this.Products[i].imageP =  this.absoluteUrl+this.Products[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'vector')){
        this.productService.findProductVector().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'pdf')){
        this.productService.findProductPDF().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'icon')){
        this.productService.findProductICON().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'eps')){
        this.productService.findProductEPS().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'svg')){
        this.productService.findProductSVG().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }
      if ((this.searchCategory === 'png')){
        this.productService.findProductPNG().subscribe(data =>{
          this.filteredProduct = data;
          for (let i = 0; i< this.filteredProduct.length ; i++){
            this.filteredProduct[i].imageP =  this.absoluteUrl+this.filteredProduct[i].imageP;
          }
        })
      }

    }
    else {
      this.getProducts();
    }

  // console.log("searchValue ="+this.searchText);
   // console.log("dropdownValue ="+ this.searchCategory);
  }
  private getProducts(){
    this.productService.getProductList().subscribe(data => {
      this.Products = data;
      for (let i = 0; i< this.Products.length ; i++){
        this.Products[i].imageP =  this.absoluteUrl+this.Products[i].imageP;
      }

    });
  }
   goToProduct(id: number){
     this.router.navigate(['details', id]);

  }

}
