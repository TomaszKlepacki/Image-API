import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AccessToken } from 'src/app/AccessToken';
import { LoginModel } from 'src/app/LoginModel';
import { ResponseObject } from 'src/app/ResponseObject';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.css']
})
export class NewloginComponent implements OnInit {
  hide = true;


 

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  @Output() onAddTask: EventEmitter<LoginModel> = new EventEmitter();

  username: string;
  password: string;

  responseErrorMessage: string;
  responseModel:AccessToken;
  responseError:boolean;
  response:ResponseObject;
  
  successfullLogin:boolean=false;

  constructor(private loginService: LoginServiceService, private router: Router,private cookieService:CookieService,private spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.loginService.attemptHomepage().subscribe(
      (response:ResponseObject) => {
        console.log(response);
        this.response=response;
        if(this.response.code===200){
          this.router.navigate(['/home']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['/newlogin']);
      }
    );
  }

  onSubmit() {
    this.spinnerService.showSpinner();
    if (!this.username || !this.password) {
      alert('Please enter both username and password!')
    }

    const userCredentials = {
      username: this.username,
      password: this.password,
    }

    this.loginService.loginUser(userCredentials).subscribe(
      (response: AccessToken) => {
        this.spinnerService.hideSpinner();
        if(response){
          this.spinnerService.hideSpinner();
          this.responseModel=response;
         if(this.responseModel.response_code==="200"){
          this.cookieService.set("access_token",this.responseModel.access_token);
          this.cookieService.set("refresh_token",this.responseModel.refresh_token);
          
          this.router.navigate(['/home']);
         } else if(this.responseModel.response_code=="403"){ 
          this.responseError=true;
          this.responseErrorMessage = "Code: "+this.responseModel.response_code+", Bad credentials";
         } else{
          console.log(response);
         }
    }
      },
      (error: HttpErrorResponse) => {
        this.spinnerService.hideSpinner();
        this.responseError=true;

        if(error.status==0){
          this.responseErrorMessage='Server is not responding. Try later.';
        } else {
          this.responseErrorMessage = "Code: " + error.error.code + ", Message: " + error.error.message;
        }
        this.username='';
        this.password='';
      });
  }


}

