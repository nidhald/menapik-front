import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../Service/product.service";
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
/*import * as JSZipUtils from '../../../../assets/script/jszip-utils.js';*/
// @ts-ignore
import * as JSZipUtils from '../../../../assets/script/jszip-utils.js';

import {data} from "jquery";
import {StorageService} from "../../../Service/StorageService";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailArticleComponent implements OnInit {
  hoverIdx = -1;
  id: number;
  product: Product= {
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
  isLoggedIn = false;
  productIllustration: Product[] = [];
  clicked1: boolean ;
  clicked2: boolean ;
  clicked3: boolean ;
  clicked4: boolean ;
  clicked5: boolean ;
  clicked6: boolean ;
  fileName : string ="";
  fileAbsolutUrl: string = "http://localhost:8080/upload/static/images/products/";
  imageAbsolutUrl = ""
  filesAvailable: string[] = [];
  downloadZip : boolean = false;
  cp: string | number;

  constructor(private productServ: ProductService,private route: ActivatedRoute,private router: Router, private storageService: StorageService,) {
    route.params.subscribe(val => {
      this.id = this.route.snapshot.params['id'];
      this.productServ.getProductById(this.id).subscribe(data => {
        this.product = data;
        //this.product.imageP = this.fileAbsolutUrl +this.product.imageP;
        this.imageAbsolutUrl = this.fileAbsolutUrl +this.product.imageP;

        if ((this.product.fileVector != null)&&(this.product.fileVector != "")){
          this.downloadZip = true;
          this.clicked1 = true;
         this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.fileVector);
        }
        if ((this.product.filePDF != null)&&(this.product.filePDF != "")){
          this.downloadZip = true;
          this.clicked2 = true;
          this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.filePDF);
        }
        if ((this.product.fileIcons != null)&&(this.product.fileIcons != "")){
          this.downloadZip = true;
          this.clicked3 = true;
          this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.fileIcons);
        }
        if ((this.product.fileEPS != null)&&(this.product.fileEPS != "")){
          this.downloadZip = true;
          this.clicked4 = true;
          this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.fileEPS);
        }
        if ((this.product.fileSVG != null)&&(this.product.fileSVG != "")){
          this.downloadZip = true;
          this.clicked5 = true;
          this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.fileSVG);
        }
        if ((this.product.filePNG != null)&&(this.product.filePNG != "")){
          this.downloadZip = true;
          this.clicked6 = true;
          this.filesAvailable.push(this.fileAbsolutUrl+"file/"+this.product.filePNG);
        }
        //console.log(this.filesAvailable)
       /* console.log(this.product.colorP);
        console.log(this.product.formatP);
        console.log(this.product.styleGraphicP);
        console.log(this.product.imageP);
        console.log( window.location.href);*/
        this.productServ.findProductSameIllustration(this.product.colorP,this.product.formatP,this.product.styleGraphicP).subscribe(dataIllustration =>{
          this.productIllustration = dataIllustration;
          //console.log(dataIllustration.length)
          for (let i = 0; i< this.productIllustration.length ; i++){
            this.productIllustration[i].imageP =  "http://localhost:8080/upload/static/images/products/"+this.productIllustration[i].imageP;
          }
        })

      });

    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn){
     // window.location.href="http://localhost:4200/signin";
      this.router.navigate(['/signin']);
    }

  }


  downLoadFile(value : string) {
    if (value === 'vector')
    {
      this.fileName = this.product.fileVector;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
    if (value === 'pdf')
    {
      this.fileName = this.product.filePDF;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
    if (value === 'icon')
    {
      this.fileName = this.product.fileIcons;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
    if (value === 'eps')
    {
      this.fileName = this.product.fileEPS;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
    if (value === 'svg')
    {
      this.fileName = this.product.fileSVG;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
    if (value === 'png')
    {
      this.fileName = this.product.filePNG;
      this.productServ.downloadFile(this.fileName).subscribe(data =>{
        saveAs(data, this.fileName);
      })
    }
  }

  goToProduct(id: number){
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = false;
    this.clicked5 = false;
    this.clicked6 = false;
this.productIllustration = [];

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['details', id]);
    //show current link
   // console.log( window.location.href);
  }

  downloadAsZip(): void {
    let count = 0;
    const zip = new JSZip();

    this.filesAvailable.forEach((url) => {
      const filename = url.split('/')[url.split('/').length - 1];

      // @ts-ignore
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          throw err;
        }

        zip.file(filename, data, {binary: true});
        count++;

        if (count === this.filesAvailable.length) {
          zip.generateAsync({type: 'blob'}).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            //console.log("objectUrl:" + objectUrl);
            const link: any = document.createElement('a');

            link.download = this.product.nameP+'.zip';
            link.href = objectUrl;
            link.click();
          });
        }
      });
    });
  }
}
