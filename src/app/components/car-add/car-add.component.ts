import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarAdd } from 'src/app/models/car-add';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands: Brand[];
  colors: Color[];

  carForm: FormGroup;
  constructor(private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.brandAndColorGetAll();
    this.createCarAddForm();
  }
  createCarAddForm() {
    this.carForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  carAdd() {
    if (this.carForm.valid) {

      let car: CarAdd = {
        carName: this.carForm.value.carName,
        id: 0, brandId: parseInt(this.carForm.value.brandId),
        colorId: parseInt(this.carForm.value.colorId),
        dailyPrice: this.carForm.value.dailyPrice,
        modelYear: this.carForm.value.modelYear,
        description: this.carForm.value.description
      }; 

      this.carService.add(car).subscribe(response => {
        console.log(response);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası");
          }
        }
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Hata");
    }
  }

  brandAndColorGetAll() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
}
