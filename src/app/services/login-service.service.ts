import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../LoginModel';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ResponseObject } from '../ResponseObject';
import { AccessToken } from '../AccessToken';
import { RegistrationModel } from '../RegistrationModel';
import { CookieService } from 'ngx-cookie-service';

const httpOptionsLogin = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'mode': 'no-cors'
  })
};
const httpOptionsRegister = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
    Authorization: 'my-auth-token'
  })
};
const httpOptionssite = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  private server='http://localhost:8080/';
  private loginEndpoint='api/login';
  private registerEndpoint = "api/register";
  private verifyEndpoint = "api/verifyRegistration?token=";
  private helloUrl = "user/hello";

  constructor(private http:HttpClient,private cookieService:CookieService) { }

  loginUser(loginModel: LoginModel):Observable<AccessToken> {
    const url:string = this.server+this.loginEndpoint+"?username="+loginModel.username+"&password="+loginModel.password;
    return this.http.post<AccessToken>(url,httpOptionsLogin);
  }

  registerUser(userModel: RegistrationModel) {
    return this.http.post<ResponseObject>(this.server+this.registerEndpoint, userModel, httpOptionsRegister);
  }

  verifyRegistration(token: string) {
    return this.http.post<ResponseObject>(this.server+this.verifyEndpoint+token,httpOptionsLogin);
  }

  attemptHomepage():Observable<ResponseObject>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Credentials': 'true',
        Authorization: 'Bearer '+ this.cookieService.get("access_token")
      })
    };
    return this.http.get<ResponseObject>(this.server+this.helloUrl,httpOptions);
  }


}
