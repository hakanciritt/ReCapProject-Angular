import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  { path: "", component: CarComponent, pathMatch: "full" },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/color/:colorName", component: CarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
