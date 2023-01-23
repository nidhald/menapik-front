import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContributeurService} from "../../Service/contributeur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contributeur',
  templateUrl: './contributeur.component.html',
  styleUrls: ['./contributeur.component.css']
})
export class ContributeurComponent implements OnInit {
  @ViewChild("inputPortfolio", { static: false }) inputPortfolio: { nativeElement: any; };
  clicked = false;
  div1 = true;
  div2 = false;
  div3 = false;
  div4 = false;
  div5 = false;
  clicked1 = false;
  clicked2 = false;
  clicked3 = false;
  clicked4 = true;
  clicked5 = false;
  private isLoading: boolean;

  contributeurForm = this.fb.group({
    nameC: [""],
    emailC: [""],
    phoneNumberC: [""],
    nationalityC: [""],
    decision: ["true"],
    occupationC: [""],
    birthDayC: [""],
    linkBehance: [""],
    linkDribble: [""],
    linkLinkedin: [""],
    linkFacebook: [""],
    //freelancer : [[]],
    filePortfolio:[""],

  });
   submitted: boolean;

  constructor(private fb: FormBuilder,
              private contributeurService: ContributeurService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  checked(value: any) {
    this.clicked = !this.clicked;
    /*if (this.clicked){
      // @ts-ignore
      const index =  this.contributeurForm.value.freelancer.indexOf(value);

      // @ts-ignore
      index < 0 ? this.contributeurForm.value.freelancer.push(value) : console.log("This item already exists");

    }
    if (!this.clicked){
      // @ts-ignore
      const index =  this.contributeurForm.value.freelancer.indexOf(value);

      // @ts-ignore
      index != -1 ? this.contributeurForm.value.freelancer.splice(index, 1) : console.log("This item does not exists");

    }*/

    //console.log(value);
  }

  checked1(value: any) {
    this.clicked1 = !this.clicked1;
    /*if (this.clicked1){
      // @ts-ignore
      const index =  this.contributeurForm.value.freelancer.indexOf(value);

      // @ts-ignore
      index < 0 ? this.contributeurForm.value.freelancer.push(value) : console.log("This item already exists");

    }
    if (!this.clicked1){
      // @ts-ignore
      const index =  this.contributeurForm.value.freelancer.indexOf(value);

      // @ts-ignore
      index != -1 ? this.contributeurForm.value.freelancer.splice(index, 1) : console.log("This item does not exists");

    } */
  }

  checked2(value: any) {
    this.clicked2 = !this.clicked2;
    /* if (this.clicked2){
       // @ts-ignore
       const index =  this.contributeurForm.value.freelancer.indexOf(value);

       // @ts-ignore
       index < 0 ? this.contributeurForm.value.freelancer.push(value) : console.log("This item already exists");

     }
     if (!this.clicked2){
       // @ts-ignore
       const index =  this.contributeurForm.value.freelancer.indexOf(value);

       // @ts-ignore
       index != -1 ? this.contributeurForm.value.freelancer.splice(index, 1) : console.log("This item does not exists");

     }*/
  }

  checked3(value: any) {
    this.clicked3 = !this.clicked3;
    /* if (this.clicked3){
       // @ts-ignore
       const index =  this.contributeurForm.value.freelancer.indexOf(value);

       // @ts-ignore
       index < 0 ? this.contributeurForm.value.freelancer.push(value) : console.log("This item already exists");

     }
     if (!this.clicked3){
       // @ts-ignore
       const index =  this.contributeurForm.value.freelancer.indexOf(value);

       // @ts-ignore
       index != -1 ? this.contributeurForm.value.freelancer.splice(index, 1) : console.log("This item does not exists");

     }*/
  }

  checked4() {
    this.clicked4 = true;
    this.clicked5 = false;
    // @ts-ignore
    this.contributeurForm.value.decision = true;

  }

  checked5() {
    this.clicked5 = true;
    this.clicked4 = false;
    // @ts-ignore
    this.contributeurForm.value.decision = false;
  }

  div1Function() {
    this.div1 = false;
    this.div2 = true;

  }

  div2Function() {
    this.div2 = false;
    this.div3 = true;

  }


  div3Function() {
    this.div3 = false;
    this.div4 = true;
    this.div4 = true;

  }

  div4Function() {
    this.div4 = false;
    this.div5 = true;

  }

  div5FunctionRetour() {
    this.div5 = false;
    this.div4 = true;
  }

  div4FunctionRetour() {
    this.div4 = false;
    this.div3 = true;
  }

  div3FunctionRetour() {
    this.div3 = false;
    this.div2 = true;
  }

  div2FunctionRetour() {
    this.div2 = false;
    this.div1 = true;
  }


  onFileChange(value: any){
    if (value === 'portfolio' ){
      const targetFP = this.inputPortfolio.nativeElement;
      if (targetFP.files && targetFP.files.length ) {
        const [file] = targetFP.files;
        this.contributeurForm.patchValue({
          filePortfolio: file,
        });
      }
    }
    //console.log(this.contributeurForm.value);

  }
  onSubmit = () => {
   // console.log(this.contributeurForm.value);
    this.submitted = true;
    if (this.contributeurForm.valid) {
      const formData: FormData = new FormData();
      // @ts-ignore
      formData.append("nameC", this.contributeurForm.value.nameC);
      // @ts-ignore
      formData.append("emailC", this.contributeurForm.value.emailC);
      // @ts-ignore
      formData.append("nationalityC", this.contributeurForm.value.nationalityC);
      // @ts-ignore
      formData.append("decision", this.contributeurForm.value.decision);
      // @ts-ignore
      formData.append("linkBehance", this.contributeurForm.value.linkBehance);
      // @ts-ignore
      formData.append("linkDribble", this.contributeurForm.value.linkDribble);
      // @ts-ignore
      formData.append("linkLinkedin", this.contributeurForm.value.linkLinkedin);
      // @ts-ignore
      formData.append("linkFacebook", this.contributeurForm.value.linkFacebook);
      // @ts-ignore
      formData.append("phoneNumberC", this.contributeurForm.value.phoneNumberC);
      // @ts-ignore
      formData.append("birthDayC", this.contributeurForm.value.birthDayC);
      // @ts-ignore
      formData.append("occupationC", this.contributeurForm.value.occupationC);
      // @ts-ignore
      formData.append("filePortfolio", this.contributeurForm.value.filePortfolio);
      setTimeout(() => {
        this.contributeurService.addContributeur(formData).subscribe(
          () => {
            this.router.navigate(["/"]);
            this.isLoading = true;
          },
        );
      }, 2000);

    }

  }
}
