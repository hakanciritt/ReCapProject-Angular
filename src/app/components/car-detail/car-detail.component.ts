import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { environment } from 'src/environments/environment'
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/car-image';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  constructor(private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService) { }
  dataLoaded = false;
  carDetail: Car;
  carImages: CarImage[];
  baseUrl = environment.baseUrl + "images";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
      }
    })
  }
  getCarDetails(carId: Number) {
    this.carDetailService.getCarDetails(carId).subscribe(response => {
      this.carDetail = response.data;
      console.log(this.carDetail);
    })
    this.carImageService.getByCarId(carId).subscribe(response => {
      this.carImages = response.data;
      console.log(this.carImages);
    })
  }
}
