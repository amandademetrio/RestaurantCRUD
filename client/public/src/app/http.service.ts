import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getRestaurants() {
    return this._http.get('/restaurants');
  }

  createRestaurant(restaurant) {
    return this._http.post('/restaurants',restaurant);
  }

  getRestaurant(id) {
    return this._http.get(`/restaurants/${id}`);
  }

  updateRestaurant(restaurant,id) {
    return this._http.put(`/restaurants/${id}`,restaurant);
  }

  deleteRestaurant(id) {
    return this._http.delete(`/restaurants/${id}`);
  }

  createReview(review,id) {
    return this._http.post(`/restaurants/${id}`,review);
  }
}
