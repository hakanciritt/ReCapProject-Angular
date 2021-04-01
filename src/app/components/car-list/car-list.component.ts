import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarAdd } from 'src/app/models/car-add';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[];
  dataLoaded: boolean = false;

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
}
