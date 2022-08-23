import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  private showEmailTaken: boolean = false;
  private subject = new Subject<any>();
  
  constructor() { }

  toggleEmailTaken(): void {
    this.showEmailTaken=!this.showEmailTaken;
    this.subject.next(this.showEmailTaken);
  }

  onToggle(): Observable<any>{
    return this.subject.asObservable();
  }
}
