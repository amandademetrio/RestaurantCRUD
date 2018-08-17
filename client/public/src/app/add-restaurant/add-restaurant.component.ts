import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})

export class AddRestaurantComponent implements OnInit {
  newRestaurant = {name:"",cuisine:""};
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  }

  submitNewRestaurant() {
    let observable = this._httpService.createRestaurant(this.newRestaurant)
    observable.subscribe(data => {
      if (data['status'] == 500) {
        this.errors = data['errors']['errors']
      }
      else {
        this.newRestaurant = {name:"",cuisine:""};
        this._router.navigate(['/home']);
      }
    })

  }

  cancelAction() {
    this._router.navigate(['/home']);
  }

}
