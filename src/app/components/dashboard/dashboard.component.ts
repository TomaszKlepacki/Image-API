import { Component, OnInit } from '@angular/core';


interface image {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 
    images: image[] = [
      {value: 'never-0', viewValue: 'Never'},
      {value: 'after-5m', viewValue: 'After 5 minutes'},
      {value: 'after-10m', viewValue: 'After 10 minutes'},
      {value: 'after-15m', viewValue: 'After 15 minutes'},
      {value: 'after-20m', viewValue: 'After 20 minutes'},
      {value: 'after-30m', viewValue: 'After 30 minutes'},
      {value: 'after-1h', viewValue: 'after 1 hour'},
      {value: 'after-2h', viewValue: 'after 2 hour'},
      {value: 'after-3h', viewValue: 'after 3 hour'},
      {value: 'after-1dy', viewValue: 'after 1 day'},
      {value: 'after-2d', viewValue: 'after 2 days'},

    ];
 


}



