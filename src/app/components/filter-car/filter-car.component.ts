import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter-car',
  templateUrl: './filter-car.component.html',
  styleUrls: ['./filter-car.component.css']
})
export class FilterCarComponent implements OnInit {

  brands: Brand[];
  colors: Color[];

  brandId: Number;
  brandFilterText: string
  colorId: Number;
  colorFilterText: string;

  constructor(private colorService: ColorService,
     private brandService: BrandService) { }

  ngOnInit(): void {
    this.colorAndBrandGetAll();
  }
  colorAndBrandGetAll() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getSelectedBrand(brandId: Number) {
    console.log(brandId);
    if (this.brandId == brandId) {
      return true;
    }
    else {
      return false;
    }
  }

  getSelectedColor(colorId: Number) {
    if (this.colorId == colorId) {
      console.log(colorId);
      return true;
    }
    else {
      return false;
    }
  }

}
