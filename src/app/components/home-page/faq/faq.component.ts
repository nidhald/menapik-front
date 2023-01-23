import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../Service/StorageService";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  isLoggedIn = false;
  constructor(private storageService: StorageService,) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

}
