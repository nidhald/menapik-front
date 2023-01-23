import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../Service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../../Service/StorageService";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @ViewChild("inputImage", {static: false}) inputImage: { nativeElement: any; };
  @ViewChild("inputVector", {static: false}) inputVector: { nativeElement: any; };
  @ViewChild("inputPDF", {static: false}) inputPDF: { nativeElement: any; };
  @ViewChild("inputIcon", {static: false}) inputIcon: { nativeElement: any; };
  @ViewChild("inputEps", {static: false}) inputEps: { nativeElement: any; };
  @ViewChild("inputSVG", {static: false}) inputSVG: { nativeElement: any; };
  @ViewChild("inputPNG", {static: false}) inputPNG: { nativeElement: any; };
  idProduct: any;
  clicked1 = false;
  clicked2 = false;
  clicked3 = false;
  clicked4 = false;
  clicked5 = false;
  clicked6 = false;
  clicked7 = false;
  clicked8 = false;
  clicked9 = false;
  updateProductForm: FormGroup;
  imageURL: any = "../../../../assets/img/mena/Asset%2016.png";


  private apiUrl = 'http://localhost:8080';
  productDATA: Product = new Product();
  private valeur: string;
  styleGraph = [
    {Id: 1, Name: "Caligraphie"},
    {Id: 2, Name: "Flat Design"},
    {Id: 3, Name: "Line Art"},
    {Id: 4, Name: "Style 3D"},
    {Id: 5, Name: "Cartoon"},
    {Id: 6, Name: "Metro Design"},
    {Id: 7, Name: "Mockups"},
    {Id: 8, Name: "User Interface"},
    {Id: 9, Name: "Affiches, bannières"},
    {Id: 10, Name: "Images photographiées"},
  ]
  couleur = [
    {Id: 1, Name: "Couleur"},
    {Id: 2, Name: "Red"},
    {Id: 3, Name: "Green"},
    {Id: 4, Name: "Yellow"},
    {Id: 5, Name: "Orange"},
    {Id: 6, Name: "Blue"},
  ];
  styleSelected = "";
  colorSelected = "";
  private roles: string[] = [];
  showAdminBoard = false;
  isLoggedIn = false;
  constructor(private productServ: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private storageService: StorageService) {
    this.updateProductForm = this.fb.group({
      nameP: ["", Validators.required],
      descriptionP: ["", Validators.required],
      imageP: [""],
      fileVector: [""],
      filePDF: [""],
      fileIcons: [""],
      fileEPS: [""],
      fileSVG: [""],
      filePNG: [""],
      formatP: [""],
      styleGraphicP: [""],
      colorP: [""]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.roles = this.storageService.getUser().roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    if (!this.showAdminBoard || !this.isLoggedIn) {
      this.router.navigate(['']);
    }else if (this.showAdminBoard  && this.isLoggedIn){
      this.idProduct = this.route.snapshot.params['id'];
      this.loadProductDetails(this.idProduct);
    }
  }

  loadProductDetails(idProduct: any) {
    this.productServ.getProductById(idProduct).subscribe(data => {
      this.productDATA = data;
      this.updateProductForm.controls['nameP'].setValue(this.productDATA['nameP']);
      this.updateProductForm.controls['descriptionP'].setValue(this.productDATA['descriptionP']);
      this.updateProductForm.controls['imageP'].setValue(this.productDATA['imageP']);
      this.updateProductForm.controls['fileVector'].setValue(this.productDATA['fileVector']);
      this.updateProductForm.controls['filePDF'].setValue(this.productDATA['filePDF']);
      this.updateProductForm.controls['fileIcons'].setValue(this.productDATA['fileIcons']);
      this.updateProductForm.controls['fileEPS'].setValue(this.productDATA['fileEPS']);
      this.updateProductForm.controls['fileSVG'].setValue(this.productDATA['fileSVG']);
      this.updateProductForm.controls['filePNG'].setValue(this.productDATA['filePNG']);
      this.updateProductForm.controls['formatP'].setValue(this.productDATA['formatP']);
      this.updateProductForm.controls['styleGraphicP'].setValue(this.productDATA['styleGraphicP']);
      this.updateProductForm.controls['colorP'].setValue(this.productDATA['colorP']);
      this.styleSelected = this.updateProductForm.value.styleGraphicP;
      this.colorSelected = this.updateProductForm.value.colorP;
      this.imageURL = this.apiUrl + "/upload/static/images/products/" + this.updateProductForm.value.imageP;
      if ((this.updateProductForm.value.fileVector != null) && (this.updateProductForm.value.fileVector != "")) {
        this.clicked1 = true;
      }
      if ((this.updateProductForm.value.filePDF != null) && (this.updateProductForm.value.filePDF != "")) {
        this.clicked2 = true;
      }
      if ((this.updateProductForm.value.fileIcons != null) && (this.updateProductForm.value.fileIcons != "")) {
        this.clicked3 = true;
      }
      if ((this.updateProductForm.value.fileEPS != null) && (this.updateProductForm.value.fileEPS != "")) {
        this.clicked4 = true;
      }
      if ((this.updateProductForm.value.fileSVG != null) && (this.updateProductForm.value.fileSVG != "")) {
        this.clicked5 = true;
      }
      if ((this.updateProductForm.value.filePNG != null) && (this.updateProductForm.value.filePNG != "")) {
        this.clicked6 = true;
      }
      if (this.updateProductForm.value.formatP === "Paysage") {
        this.clicked7 = true;
      }
      if (this.updateProductForm.value.formatP === "Portrait") {
        this.clicked8 = true;
      }
      if (this.updateProductForm.value.formatP === "Carré") {
        this.clicked9 = true;
      }

    });

  }

  onSubmit() {
    const formdata: FormData = new FormData();
    // @ts-ignore
    formdata.append("nameP", this.updateProductForm.value.nameP);
    // @ts-ignore
    formdata.append("descriptionP", this.updateProductForm.value.descriptionP);
    // @ts-ignore
    formdata.append("imageP", this.updateProductForm.value.imageP);
    // @ts-ignore
    formdata.append("fileVector", this.updateProductForm.value.fileVector);
    // @ts-ignore
    formdata.append("filePDF", this.updateProductForm.value.filePDF);
    // @ts-ignore
    formdata.append("fileIcons", this.updateProductForm.value.fileIcons);
    // @ts-ignore
    formdata.append("fileEPS", this.updateProductForm.value.fileEPS);
    // @ts-ignore
    formdata.append("fileSVG", this.updateProductForm.value.fileSVG);
    // @ts-ignore
    formdata.append("filePNG", this.updateProductForm.value.filePNG);
    // @ts-ignore
    formdata.append("formatP", this.updateProductForm.value.formatP);
    // @ts-ignore
    formdata.append("styleGraphicP", this.updateProductForm.value.styleGraphicP);
    // @ts-ignore
    formdata.append("colorP", this.updateProductForm.value.colorP);
    console.log("produit mis a jour" + this.updateProductForm.value);
    this.productServ.updateProduct(this.productDATA.id, formdata).subscribe(data => {
      this.goToProductList();
    });
  }

  goToProductList() {
    this.router.navigate(['/all-product']);
  }

  //button1 format state change
  checked7() {
    this.clicked7 = !this.clicked7;
    this.clicked8 = false;
    this.clicked9 = false;
    this.updateProductForm.value.formatP = "Paysage";
  }

  //button2 format state change
  checked8() {
    this.clicked8 = !this.clicked8;
    this.clicked7 = false;
    this.clicked9 = false;
    this.updateProductForm.value.formatP = "Portrait";
  }

  //button3 format state change
  checked9() {
    this.clicked9 = !this.clicked9;
    this.clicked8 = false;
    this.clicked7 = false;
    this.updateProductForm.value.formatP = "Carré";
  }

  onFileChange(value: any) {
    if (value === 'image') {
      const target = this.inputImage.nativeElement;
      if (target.files && target.files.length) {
        const [file] = target.files;
        this.updateProductForm.patchValue({
          imageP: file,
        });
        const reader = new FileReader();
        // console.log(reader);
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imageURL = reader.result;
        };
      }
      //console.log(this.imageURL)
    }
    if (value === 'vector') {

      const targetV = this.inputVector.nativeElement;
      if (targetV.files && targetV.files.length) {
        const [file] = targetV.files;
        this.updateProductForm.patchValue({
          fileVector: file,
        });
      }
      this.clicked1 = true;

    }
    if (value === 'pdf') {

      const targetPDF = this.inputPDF.nativeElement;
      if (targetPDF.files && targetPDF.files.length) {
        const [file] = targetPDF.files;
        this.updateProductForm.patchValue({
          filePDF: file,
        });
      }
      this.clicked2 = true;

    }
    if (value === 'icon') {

      const targetIcon = this.inputIcon.nativeElement;
      if (targetIcon.files && targetIcon.files.length) {
        const [file] = targetIcon.files;
        this.updateProductForm.patchValue({
          fileIcons: file,
        });
      }
      this.clicked3 = true;

    }
    if (value === 'eps') {

      const targetEPS = this.inputEps.nativeElement;
      if (targetEPS.files && targetEPS.files.length) {
        const [file] = targetEPS.files;
        this.updateProductForm.patchValue({
          fileEPS: file,
        });
      }
      this.clicked4 = true;


    }
    if (value === 'svg') {

      const targetSVG = this.inputSVG.nativeElement;
      if (targetSVG.files && targetSVG.files.length) {
        const [file] = targetSVG.files;
        this.updateProductForm.patchValue({
          fileSVG: file,
        });
      }
      this.clicked5 = true;


    }
    if (value === 'png') {

      const targetPNG = this.inputPNG.nativeElement;
      if (targetPNG.files && targetPNG.files.length) {
        const [file] = targetPNG.files;
        this.updateProductForm.patchValue({
          filePNG: file,
        });
      }
      this.clicked6 = true;


    }

    //console.log(this.updateProductForm.value)

  }


}
