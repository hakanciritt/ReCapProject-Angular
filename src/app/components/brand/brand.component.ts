import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded: boolean = false;
  currentBrand: Brand;

  constructor(private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.deleteBrand(params["id"])
      }
    })
    this.getBrands();
  }


  deleteBrand(id: number) {
    let brand: Brand = { id: parseInt(id.toString()), name: "" };
    if (confirm("Silmek istediğinden emin misin ?")) {
      this.brandService.delete(brand).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
        console.log(id);
      })
    } else {
      this.toastrService.info("Silme işlemi iptal edildi", "Uyarı");
    }
    this.router.navigate(['/brand']);
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }
}
