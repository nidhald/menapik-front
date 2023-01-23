import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {ContributeurService} from "../../Service/contributeur.service";
import {Contributeur} from "../../Model/Contributeur";
import {Observable} from "rxjs";
import {StorageService} from "../../Service/StorageService";

declare let $: any;

class ApiResponse {

  status:number;
  message:number;
  result: any;
}

@Component({
  selector: 'app-list-contributeur',
  templateUrl: './list-contributeur.component.html',
  styleUrls: ['./list-contributeur.component.css']
})
export class ListContributeurComponent implements OnInit {
  public Contributeurs:  Contributeur[];
  private roles: string[] = [];
  showAdminBoard = false;
  constructor(private contributeurService: ContributeurService,private router: Router,private storageService: StorageService,) { }
  @Input() contributeur : Contributeur = {
    birthDayC: "",
    decision: "",
    emailC: "",
    idC: 0,
    linkBehance: "",
    linkDribble: "",
    linkFacebook: "",
    linkLinkedin: "",
    nameC: "",
    nationalityC: "",
    occupationC: "",
    phoneNumberC: 0,
    filePortfolio: ""


  }
  ngOnInit(): void {
    this.Contributeurs = [];
    this.getContributeurs();
    this.roles = this.storageService.getUser().roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    if (!this.showAdminBoard) {
      this.router.navigate(['']);
    }



  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    //do next particular records like  101 - 200 rows.
    //we are calling to api

    console.log('next clicked')
  }
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }
  private getContributeurs(){
    this.contributeurService.getContributeurList().subscribe(data => {
      this.Contributeurs = data ;
      setTimeout(()=>{
        $('#contributeur').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: false,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]],
            language: {
              url: 'dataTables.german.json'
            }
        },
          );
      }, 1);
      console.log(this.Contributeurs);

    });

  }

}
