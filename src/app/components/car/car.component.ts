import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  dataLoaded: boolean = false;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] || params["colorName"]) {
        if (params["brandId"]) {
          this.getCarsBrandId(params["brandId"]);
        }
        if (params["colorName"]) {
          this.getCarsByColorName(params["colorName"]);
        }
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
  getCarsBrandId(brandId: number) {
    this.carService.getCarsById(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsByColorName(colorName: string) {
    this.carService.getCarsByColorName(colorName).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
}
