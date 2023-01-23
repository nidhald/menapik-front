import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../Service/product.service";
import {Product} from "../../../Model/Product";
import { Router } from '@angular/router';
import {StorageService} from "../../../Service/StorageService";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  hoverIdx = -1;
  dtOptions: DataTables.Settings = {};
  public Products: Product[];
  private roles: string[] = [];
  showAdminBoard = false;

  constructor(private productService: ProductService,private router: Router,private storageService: StorageService,) { }
  @Input() product: Product = {
    colorP: "",
    styleGraphicP: "",
    formatP: "",
    descriptionP: "",
    fileEPS: "",
    fileIcons: "",
    filePDF: "",
    filePNG: "",
    fileSVG: "",
    fileVector: "",
    id: 0,
    imageP: "",
    nameP: ""


  };

  ngOnInit() : void{
 this.getProducts();
    this.roles = this.storageService.getUser().roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    if (!this.showAdminBoard) {
      this.router.navigate(['']);
    }
/*    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 15, 25],
      processing: true
    };*/
/*    $(function() {
      $('#products').DataTable();
    })*/
  }

  private getProducts(){
    this.productService.getProductList().subscribe(data => {
      this.Products = data;
      for (let i = 0; i< this.Products.length ; i++){
       this.Products[i].imageP =  "http://localhost:8080/upload/static/images/products/"+this.Products[i].imageP;
      }
      setTimeout(()=>{
        $('#products').DataTable( {
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/French.json"
          },
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
        } );
      }, 1);
    });
  }

 /* productDetails(id: number){
    this.router.navigate(['product-details', id]);
  }*/

  updateProduct(id: number){
    this.router.navigate(['update-product', id]);
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe( data => {

      this.getProducts();
    })
  }

 /* public selectProduct(p : Product){
    this.selectedProduct = p;
    console.log(this.selectedProduct)
  }*/

}
