import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'app-contenu',
  templateUrl: './contenu.component.html',
  styleUrls: ['./contenu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContenuComponent implements OnInit {
  slideNumber: number = 3;
  private innerWidth: number;
  private _event: any;


  constructor() { }

  ngOnInit(): void {
    this.onResize(event);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._event = event;
    this.innerWidth = window.innerWidth;
    //console.log(this.innerWidth)
    if (this.innerWidth < 650) {
      this.slideNumber = 1
    } else if ((this.innerWidth >= 650) && (this.innerWidth < 768) ){
      this.slideNumber = 2
    }else if (this.innerWidth >= 768) {
      this.slideNumber = 3
    }
  }

}
