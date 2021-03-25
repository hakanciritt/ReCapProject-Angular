import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  dataLoaded: boolean = false;
  baseUrl = environment.baseUrl;
  filterText = "";

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"] || params["brandId"]) {
        this.getCarDetails(params["brandId"], params["colorId"])
      } else {
        this.getCars();
      }
    })
  }
  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarDetails(brandId: number, colorId: number) {
    this.carService.getCarDetails(brandId, colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  // getCarsBrandName(brandName: string) {
  //   this.carService.getCarsByName(brandName).subscribe(response => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   })
  // }
  // getCarsByColorName(colorName: string) {
  //   this.carService.getCarsByColorName(colorName).subscribe(response => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   })
  // }
}
