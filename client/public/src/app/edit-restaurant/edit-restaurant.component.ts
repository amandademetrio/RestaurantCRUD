import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurant = {};
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.findRestaurant(params.id);
  });
  }

  findRestaurant(id) {
    let observable = this._httpService.getRestaurant(id)
    observable.subscribe(data => {
      this.restaurant = data['restaurant'];
    })
  }

  editRestaurant() {
    let observable = this._httpService.updateRestaurant(this.restaurant,this.restaurant['_id']);
    observable.subscribe(data => {
      if (data['status'] == 500) {
        this.errors = data['errors']['errors']
      }
      else {
        this._router.navigate(['/home']);
      }

    })
  }
  
  cancelAction() {
    this._router.navigate(['/home']);
  }

}
