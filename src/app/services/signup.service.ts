import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationModel } from '../RegistrationModel';
import { ResponseObject } from '../ResponseObject';
import { SpinnerService } from './spinner.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private registerUrl = "http://localhost:8080/api/register";


  constructor(private http: HttpClient, private spinnerService: SpinnerService) {
  }


  attemptRegistration(userModel: RegistrationModel) {
    return this.http.post<ResponseObject>(this.registerUrl, userModel, httpOptions);
  }
}
