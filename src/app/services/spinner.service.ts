import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  
  private _loading= new BehaviorSubject<boolean>(false);
  public readonly loading$=this._loading.asObservable();

  constructor() { }

  showSpinner(){
    this._loading.next(true);
  }
  hideSpinner(){
    this._loading.next(false);
  }
}
