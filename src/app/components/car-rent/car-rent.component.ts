import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {

  rentalCarForm: FormGroup;
  car: Car;
  customers: Customer[];

  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarDetail(params["id"])
      }
    })
    this.createRentalCarForm();
    this.getCustomers();
  }

  createRentalCarForm() {
    this.rentalCarForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      carId: ['', Validators.required],
      // customerId:['',Validators.required]
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }
  addRentals() {
    if (this.rentalCarForm.valid) {

      let rentModule = Object.assign({}, this.rentalCarForm.value);
      this.rentalService.checkIfCarRent(rentModule).subscribe(response => {
        if(response.success){
          this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz", "Uyarı");
          this.router.navigate(['/payment']);
        }
      }, responseError => {
        console.log(responseError);
        this.toastrService.error(responseError.error.message, "Hata");
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat");
    }
  }

  getCarDetail(carid: number) {
    this.carService.getCarDetail(carid).subscribe(response => {
      this.car = response.data;
    });
  }
}
