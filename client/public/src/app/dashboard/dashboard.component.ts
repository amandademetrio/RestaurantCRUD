import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restaurants = [];
  restaurant = {};
  current_date = Date.now();
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getRestaurants();
    setInterval( () => {this.updateTime()}, 1000);
  }

  getRestaurants() {
    let observable = this._httpService.getRestaurants()
    observable.subscribe(data => {
      this.restaurants = data['restaurants'];
      this.updateTime();
      for (let restaurant in this.restaurants) {
        restaurant['show_edit'] = false
      };
    })
  }

  updateTime(){
    for(let t in this.restaurants){
      let now = new Date().getTime();
      let start = new Date(this.restaurants[t].createdAt).getTime();
      if ((now - start)/1000 < 30) {
        this.restaurants[t].deletable = true;
      }
      else {
        this.restaurants[t].deletable = false;
      }
    }
  }

  deleteRestaurant(id) {
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      console.log("deleted record")
      this.getRestaurants();
    })
  }

  showEdit(restaurant) {
    restaurant.showEditPanel = true;
  }

  cancelUpdate(restaurant) {
    restaurant.showEditPanel = false;
    this.getRestaurants();
  }

  editRestaurant(restaurant) {
    let observable = this._httpService.updateRestaurant(restaurant,restaurant['_id']);
    observable.subscribe(data => {
      if (data['status'] == 500) {
        this.errors = data['errors']['errors']
      }
      else {
        this.getRestaurants();
      }

    })
  }

}
