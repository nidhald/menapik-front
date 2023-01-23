import { Component } from '@angular/core';
import * as AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Menapik';
  ngOnInit(){
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
    this.router.events.subscribe(x => {
      if(x instanceof NavigationEnd)
      {
        window.scrollTo(0, 0);
      }
    });


  }

  constructor(private spinner: NgxSpinnerService, private router : Router) {
    this.router = router;
  }





}
