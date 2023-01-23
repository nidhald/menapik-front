import {Component, OnInit} from '@angular/core';
//import {AuthentificationService} from "../../../Service/authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "../../../Service/user.service";
import {AuthService} from "../../../Service/auth.service";
import {StorageService} from "../../../Service/StorageService";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = true;
  errorMessage = '';
  roles: string[] = [];
  SignInForm: FormGroup;
  email: string;
  password: string;

  ngOnInit(): void {
    this.SignInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  constructor( private http: HttpClient,
               private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private authService: AuthService,
               private storageService: StorageService,
               private socialAuthService: SocialAuthService) {
  }

  get form() {
    return this.SignInForm.controls;
  }

  connect() {
    this.submitted = true;
    this.authService.login(this.SignInForm.value.email, this.SignInForm.value.password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveName(data.name);
        this.storageService.saveAuthorities(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // console.log("this.roles = " + this.roles);
        this.reloadPage();

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    });
  }


  reloadPage(): void {
    //this.router.navigate(['/']);
    window.location.reload();
    window.location.href = "http://localhost:4200";
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data)
      }
    );
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data)
      });
  }
}
