import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResponseObject } from 'src/app/ResponseObject';
import { RegistrationModel } from 'src/app/RegistrationModel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/services/ui.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Subscription } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }



  hide = true;
  
  username: string;
  email: string;
  password: string;
  response: ResponseObject;
  subscription: Subscription;

  successfullRegistration: boolean = false;
  error: boolean = false;
  errorResponse: string;
  url:string;

  @Output() out: EventEmitter<RegistrationModel> = new EventEmitter();


  constructor(private loginService: LoginServiceService, private router: Router, private uiService: UiService, private spinnerService: SpinnerService) {
    this.subscription = this.uiService.onToggle().subscribe
      (value => this.error = value);

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
        
        });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.spinnerService.showSpinner();

    if (this.username && this.email && this.password) {
      const userModel = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      await this.loginService.registerUser(userModel).subscribe(
        (response: ResponseObject) => {
          this.spinnerService.hideSpinner();
          if (response.code == 200) {
            this.successfullRegistration = true;
            this.url=response.message;
          } else {
            this.router.navigate(['/signin'])
          }
        },
        (error: HttpErrorResponse) => {
          this.error=true;
          this.spinnerService.hideSpinner();
          if (error.status == 0) {
            this.errorResponse = 'Server is not responding. Try later.';
          } else if (error.error.status==409){
            this.errorResponse="Code: "+error.error.code+", Message: "+error.error.message;
          }
          else {
            this.errorResponse = "Code: " + error.error.code + ", Message: " + error.error.message;
          }
          this.email = '';
          this.username = '';
          this.password = '';
        }
      );
    }
    else {
      alert("All fields");
      this.spinnerService.hideSpinner();
    }
  }

}
