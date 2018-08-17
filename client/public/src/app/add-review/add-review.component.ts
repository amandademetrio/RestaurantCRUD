import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  review = {};
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

  submitNewReview() {
    let observable = this._httpService.createReview(this.review,this.restaurant['_id'])
    observable.subscribe(data => {
      if (data['status'] == 500) {
        this.errors = data['errors']['errors']
      }
      else {
        this._router.navigate(['/restaurant/'+this.restaurant['_id']]);
      }
    })
  }

  cancelAction() {
    this._router.navigate(['/restaurant/'+this.restaurant['_id']]);
  }

}
