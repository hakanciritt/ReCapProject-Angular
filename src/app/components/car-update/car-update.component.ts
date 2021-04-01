import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarAdd } from 'src/app/models/car-add';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  car: CarAdd;


  constructor(private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getByCarId(params["id"]);
      }
    })

    this.createCarUpdateForm();
    this.getColorAndBrand();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id:['',Validators.required],
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      modelYear: ['', Validators.required]
    })
  }
  carUpdate() {
    if (this.carUpdateForm.valid) {
      let car: CarAdd = {
        id: parseInt(this.carUpdateForm.value.id),
        brandId: parseInt(this.carUpdateForm.value.brandId),
        colorId: parseInt(this.carUpdateForm.value.colorId),
        carName: this.carUpdateForm.value.carName,
        dailyPrice: this.carUpdateForm.value.dailyPrice,
        modelYear: this.carUpdateForm.value.modelYear,
        description: this.carUpdateForm.value.description
      } 
      this.carService.update(car).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/car-list']);
      }, responseError => {
        console.log(responseError);
        this.toastrService.error(responseError.message, "Hata")
      }) 
    } else {
      this.toastrService.error("Form eksik", "Hata")
    }
  }
  getColorAndBrand() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  getByCarId(id: number) {
    this.carService.getById(id).subscribe(response => {
      this.car = response.data;
      this.carUpdateForm = this.formBuilder.group({
        id:new FormControl(this.car.id),
        carName: new FormControl(this.car.carName),
        brandId: new FormControl(this.car.brandId),
        colorId: new FormControl(this.car.colorId),
        dailyPrice: new FormControl(this.car.dailyPrice),
        description: new FormControl(this.car.description),
        modelyear: new FormControl(this.car.modelYear)
      })
    }, responseError => {
      console.log(responseError);
    })
  }
}
