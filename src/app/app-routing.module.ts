import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", component: CarComponent, pathMatch: "full" },
  { path: "cars", component: CarComponent },
  { path: "cars/cardetail/:carId", component: CarDetailComponent },
  { path: "cars/filter/:colorId/:brandId", component: CarComponent },
  { path: "car-rent/:id", component: CarRentComponent },
  { path: "payment", component: PaymentComponent },
  { path: "brand", component: BrandComponent },
  { path: "color", component: ColorComponent },
  { path: "car-list", component: CarListComponent },
  { path: "brand-add", component: BrandAddComponent },
  { path: "brand/delete/:id", component: BrandComponent },
  { path: "brand/update/:id", component: BrandUpdateComponent },
  { path: "color-add", component: ColorAddComponent },
  { path: "color/delete/:id", component: ColorComponent },
  { path: "color/update/:id", component: ColorUpdateComponent },
  { path: "car-list/update/:id", component: CarUpdateComponent },
  { path: "car-list/delete/:id", component: CarListComponent },
  { path: "car-add", component: CarAddComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
