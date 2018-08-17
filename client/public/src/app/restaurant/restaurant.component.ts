import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurant = {};
  currentReviews = [];

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
      this.currentReviews = this.restaurant['reviews'];
      this.currentReviews.sort(function (a, b) {
        return a.rating - b.rating;
      });
      console.log(this.currentReviews)
    })
  }

}
