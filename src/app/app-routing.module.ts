import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  { path: "", component: CarComponent, pathMatch: "full" },
  { path: "cars/brand/:brandName", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/color/:colorName", component: CarComponent },
  { path: "cars/cardetail/:carId", component: CarDetailComponent },
  { path: "cars/filter/:colorId/:brandId", component: CarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
