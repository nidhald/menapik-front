import { Component, HostListener, OnInit,ViewEncapsulation } from '@angular/core';
import {StorageService} from "../../../Service/StorageService";
import {AuthService} from "../../../Service/auth.service";
import {Subscription} from "rxjs";
import {EventBusService} from "../../../_shared/event-bus.service";

declare  const animation:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showContributeurBoard = false;
  name?: string;

  eventBusSub?: Subscription;
  isCollapsed = true;
  constructor( private storageService: StorageService,
               private authService: AuthService,
               private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
////console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = this.storageService.getUser().roles;
      //console.log("this.storageService.getUser().roles = "+ this.storageService.getUser().roles)
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //console.log("this.showAdminBoard = "+ this.showAdminBoard)
      this.showContributeurBoard = this.roles.includes('ROLE_CONTRIBUTEUR');
      //console.log("this.showContributeurBoard = "+ this.showContributeurBoard)
      this.name = user.name;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        //console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        //console.log(err);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
      let element = document.querySelector('.fixed-top') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('header-scrolled');
      } else {
        element.classList.remove('header-scrolled');
      }

    }
    dropDown(){
      let element = document.querySelector('.mobile-nav-toggle') as HTMLElement;



    }
















}
