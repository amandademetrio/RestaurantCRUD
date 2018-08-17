import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

const routes: Routes = [
  {path:'home',component: DashboardComponent},
  {path:'add',component: AddRestaurantComponent},
  {path:'restaurant/:id',component: RestaurantComponent},
  {path:'addreview/:id',component: AddReviewComponent},
  {path:'edit/:id',component: EditRestaurantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
