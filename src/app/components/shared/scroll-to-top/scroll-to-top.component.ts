import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])

  scrollToTop() {
      let element = document.querySelector('.back-to-top') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }

    }
  topScroll(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }





}
