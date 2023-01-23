import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import {User} from "../../../Model/User";
import {AuthService} from "../../../Service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  submitted = false;
  isSignUpFailed = true;
  errorMessage = '';
 SignupForm: FormGroup;

  constructor(private http: HttpClient, private router: Router,private fb : FormBuilder, private authService: AuthService) {}


  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
    })
  }
  get form() { return this.SignupForm.controls; }

  onSubmitForm(){
    this.submitted = true;
    this.authService.register(this.SignupForm.value.name,this.SignupForm.value.email,this.SignupForm.value.password).subscribe({
      next: data => {
        //console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/signin']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });

  }

}
