import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { environment } from 'src/environments/environment'
import { CarDetailService } from 'src/app/services/car-detail.service';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  constructor(private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }
  dataLoaded = false;
  carDetail: Car;
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
  }
}
