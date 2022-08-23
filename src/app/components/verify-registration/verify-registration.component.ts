import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessToken } from 'src/app/AccessToken';
import { ResponseObject } from 'src/app/ResponseObject';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.css']
})
export class VerifyRegistrationComponent implements OnInit {

  response:ResponseObject={code:0,message:""};
  successfulVerification:boolean=false;
  unsuccessfullVerification:boolean=false;
  verificationReponse:string="";

  constructor(private loginService:LoginServiceService,private activatedRoute: ActivatedRoute,private spinnerService:SpinnerService) {

   }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    let token="";
    // this.activatedRoute.params.forEach((x)=>console.log(x));
    token=this.activatedRoute.snapshot.queryParams['token'];
    if(token){
      this.loginService.verifyRegistration(token).subscribe(
        (response: ResponseObject) =>{
          this.spinnerService.hideSpinner();
            this.response=response;
            console.log("xD");
            console.log(this.response);
            if(this.response) {
              if(this.response.code==200){
                this.successfulVerification=true;
                this.verificationReponse=this.response.message;
                console.log('xd');
                
              }
            }
            
        }, (error:HttpErrorResponse) =>{
          this.spinnerService.hideSpinner();
          console.log("xD");
          console.log(error);
          this.response=error.error;
          this.unsuccessfullVerification=true;
          this.verificationReponse="Code: "+this.response.code+", Message: "+this.response.message;
        }
      );
    }
    
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params);
    // });
    // const token=this.activatedRoute.snapshot.paramMap.get("id");
    // console.log(token);
    
  }

}
