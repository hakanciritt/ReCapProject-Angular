import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NavComponent } from './components/nav/nav.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterCarComponent } from './components/filter-car/filter-car.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NavComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    CarDetailComponent,
    FilterCarComponent,
    FilterPipePipe,
    CarRentComponent,
    PaymentComponent,
    CarListComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    CarAddComponent,
    CarUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
