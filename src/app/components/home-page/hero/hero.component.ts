import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  category = [
    {Id:1, Name:"Categorie" , val:""},
    {Id:2, Name:"vecteur", val:"vector"},
    {Id:3, Name:"PDF", val:"pdf"},
    {Id:4, Name:"ICON", val:"icon"},
    {Id:5, Name:"EPS", val:"eps"},
    {Id:6, Name:"SVG", val:"svg"},
    {Id:7, Name:"PNG", val:"png"},
  ];
  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }
  @Output()
  multipleValue : EventEmitter<string[]> = new EventEmitter<string[]>();
  searchProductForm = this.fb.group({
    searchValue: ["", Validators.required],
    selectValue: ["", Validators.required],
  });

  getProductByName(valueText: string, valueSelect: string){
    this.multipleValue.emit([valueText,valueSelect])
   // console.log(valueSelect);
  }



}
