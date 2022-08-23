import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ResponseObject } from 'src/app/ResponseObject';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response:ResponseObject;
  successfullAuthorization:boolean=false;


  constructor(private loginService:LoginServiceService,private router:Router) { }

  ngOnInit(): void {
    this.loginService.attemptHomepage().subscribe(
      (response:ResponseObject) => {
        console.log(response);
        this.response=response;
        if(this.response.code===200){
            this.successfullAuthorization=true;
            console.log("auth");
            
            console.log(this.successfullAuthorization);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['/signin']);
      }
    );
    console.log("hehe");
    
  }

}
