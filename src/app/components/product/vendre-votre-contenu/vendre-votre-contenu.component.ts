import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../Service/product.service";
import {Validators, FormBuilder,} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {StorageService} from "../../../Service/StorageService";
import {AuthService} from "../../../Service/auth.service";
import {EventBusService} from "../../../_shared/event-bus.service";

@Component({
  selector: 'app-vendre-votre-contenu',
  templateUrl: './vendre-votre-contenu.component.html',
  styleUrls: ['./vendre-votre-contenu.component.css']
})
export class VendreVotreContenuComponent implements OnInit {

  @ViewChild("inputImage", {static: false}) inputImage: { nativeElement: any; };
  @ViewChild("inputVector", {static: false}) inputVector: { nativeElement: any; };
  @ViewChild("inputPDF", {static: false}) inputPDF: { nativeElement: any; };
  @ViewChild("inputIcon", {static: false}) inputIcon: { nativeElement: any; };
  @ViewChild("inputEps", {static: false}) inputEps: { nativeElement: any; };
  @ViewChild("inputSVG", {static: false}) inputSVG: { nativeElement: any; };
  @ViewChild("inputPNG", {static: false}) inputPNG: { nativeElement: any; };
  showAlert = false;
  div1 = true;
  div2 = false;
  div3 = false;
  clicked1 = false;
  clicked2 = false;
  clicked3 = false;
  clicked4 = false;
  clicked5 = false;
  clicked6 = false;
  clicked7 = false;
  clicked8 = false;
  clicked9 = false;
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;

  imageDataUrl: any = "../../../../assets/img/mena/Asset%2016.png";
  styleGraphic = [
    {Id: 0, Name: "Style gpraphique"},
    {Id: 1, Name: "Caligraphie", val: "Caligraphie"},
    {Id: 2, Name: "Flat design", val: "Flat design"},
    {Id: 3, Name: "Line Art", val: "Line Art"},
    {Id: 4, Name: "Style 3D", val: "Icon"},
    {Id: 5, Name: "Cartoon", val: "Cartoon"},
    {Id: 6, Name: "Metro Design", val: "Metro Design"},
    {Id: 7, Name: "Mockups", val: "Mockups"},
    {Id: 8, Name: "User interface", val: "User interface"},
    {Id: 9, Name: "Affiches, bannières", val: "Affiches Bannières"},
    {Id: 10, Name: "Images photographiées", val: "Image Photographie"},
  ]
  couleur = [
    {Id: 1, Name: "Couleur", color: "black"},
    {Id: 2, Name: "Red", color: "red"},
    {Id: 3, Name: "Green", color: "green"},
    {Id: 4, Name: "Yellow", color: "yellow"},
    {Id: 5, Name: "Orange", color: "orange"},
    {Id: 6, Name: "Blue", color: "blue"},
  ];


  createProductForm = this.fb.group({
    nameP: ["", Validators.required],
    descriptionP: ["", Validators.required],
    imageP: [null],
    fileVector: [null],
    filePDF: [null],
    fileIcons: [null],
    fileEPS: [null],
    fileSVG: [null],
    filePNG: [null],
    formatP: [""],
    styleGraphicP: [""],
    colorP: [""],
  });

  private isLoading: boolean;
  private failed: boolean;

  constructor(
    private router: Router,
    private productServ: ProductService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/signin']);
    } /*else if (this.isLoggedIn){
  this.router.navigate(['/vendre-votre-contenu']);
}*/
    this.roles = this.storageService.getUser().roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    if (!this.showAdminBoard) {
      this.router.navigate(['']);
    }
  }


  onFileChange(value: any) {
    if (value === 'image') {
      const target = this.inputImage.nativeElement;
      if (target.files && target.files.length) {
        const [file] = target.files;
        this.createProductForm.patchValue({
          imageP: file,
        });
        const reader = new FileReader();
        // //console.log(reader);
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imageDataUrl = reader.result;
        };
      }
      this.submitted();
    }
    if (value === 'vector') {
      const targetV = this.inputVector.nativeElement;
      if (targetV.files && targetV.files.length) {
        const [file] = targetV.files;
        this.createProductForm.patchValue({
          fileVector: file,
        });
      }
      this.clicked1 = true;
      this.submitted();
    }
    if (value === 'pdf') {
      const targetPDF = this.inputPDF.nativeElement;
      if (targetPDF.files && targetPDF.files.length) {
        const [file] = targetPDF.files;
        this.createProductForm.patchValue({
          filePDF: file,
        });
      }
      this.clicked2 = true;
      this.submitted();
    }
    if (value === 'icon') {
      const targetIcon = this.inputIcon.nativeElement;
      if (targetIcon.files && targetIcon.files.length) {
        const [file] = targetIcon.files;
        this.createProductForm.patchValue({
          fileIcons: file,
        });
      }
      this.clicked3 = true;
      this.submitted();
    }
    if (value === 'eps') {

      const targetEPS = this.inputEps.nativeElement;
      if (targetEPS.files && targetEPS.files.length) {
        const [file] = targetEPS.files;
        this.createProductForm.patchValue({
          fileEPS: file,
        });
      }
      this.clicked4 = true;
      this.submitted();

    }
    if (value === 'svg') {

      const targetSVG = this.inputSVG.nativeElement;
      if (targetSVG.files && targetSVG.files.length) {
        const [file] = targetSVG.files;
        this.createProductForm.patchValue({
          fileSVG: file,
        });
      }
      this.clicked5 = true;
      this.submitted();

    }
    if (value === 'png') {

      const targetPNG = this.inputPNG.nativeElement;
      if (targetPNG.files && targetPNG.files.length) {
        const [file] = targetPNG.files;
        this.createProductForm.patchValue({
          filePNG: file,
        });
      }
      this.clicked6 = true;
      this.submitted();

    }

//console.log(this.createProductForm.value)

  }

  onSubmit = (styleGraph: any, colorP: any) => {


    this.createProductForm.value.styleGraphicP = styleGraph;
    this.createProductForm.value.colorP = colorP;

    if (this.createProductForm.valid) {
      this.isLoading = true;
      this.failed = false;
      const formdata: FormData = new FormData();
      // @ts-ignore
      formdata.append("nameP", this.createProductForm.value.nameP);
      // @ts-ignore
      formdata.append("descriptionP", this.createProductForm.value.descriptionP);
      // @ts-ignore
      formdata.append("imageP", this.createProductForm.value.imageP);
      // @ts-ignore
      formdata.append("fileVector", this.createProductForm.value.fileVector);
      // @ts-ignore
      formdata.append("filePDF", this.createProductForm.value.filePDF);
      // @ts-ignore
      formdata.append("fileIcons", this.createProductForm.value.fileIcons);
      // @ts-ignore
      formdata.append("fileEPS", this.createProductForm.value.fileEPS);
      // @ts-ignore
      formdata.append("fileSVG", this.createProductForm.value.fileSVG);
      // @ts-ignore
      formdata.append("filePNG", this.createProductForm.value.filePNG);
      // @ts-ignore
      formdata.append("formatP", this.createProductForm.value.formatP);
      // @ts-ignore
      formdata.append("styleGraphicP", this.createProductForm.value.styleGraphicP);
      // @ts-ignore
      formdata.append("colorP", this.createProductForm.value.colorP);

      this.productServ.createProductWithFileUpload(formdata).subscribe(
        () => {
          this.router.navigate(["/all-product"]);
          this.isLoading = true;
        },
      );
    }

    //console.log(this.createProductForm.value);
  };


  //show second section and hide first section
  div1Function() {
    this.div1 = false;
    this.div2 = true;
  }

  //show third section and hide second section
  div2Function() {
    this.div2 = false;
    this.div3 = true;
  }

  //button1 state change
  checked(clicked: boolean) {
    clicked = true;
    return clicked;

  }

  //button1 format state change
  checked7() {
    this.clicked7 = !this.clicked7;
    this.clicked8 = false;
    this.clicked9 = false;
    this.createProductForm.value.formatP = "Paysage";
    //console.log(this.createProductForm.value.formatP);


    //console.log(this.createProductForm.value);
  }

  //button2 format state change
  checked8() {
    this.clicked8 = !this.clicked8;
    this.clicked7 = false;
    this.clicked9 = false;
    this.createProductForm.value.formatP = "Portrait";
    // //console.log(this.createProductForm.value.formatP);


    // //console.log(this.createProductForm.value);
  }

  //button3 format state change
  checked9() {
    this.clicked9 = !this.clicked9;
    this.clicked8 = false;
    this.clicked7 = false;
    this.createProductForm.value.formatP = "Carré";
    //console.log(this.createProductForm.value.formatP);


    //console.log(this.createProductForm.value);
  }

  /*onCategorieSelector(valueselected : string) {

    this.valeur = valueselected
    return this.valeur;
  }*/

  submitted() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }
}
