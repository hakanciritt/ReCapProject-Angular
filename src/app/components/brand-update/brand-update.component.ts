import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand: Brand;
  brandUpdateForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getByIdBrand(params["id"]);
      }
    })
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required]
    })
  }
  brandUpdate() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
      }, responseError => {
        this.toastrService.error(responseError.message, "Hata")
      })
    } else {
      this.toastrService.error("Form eksik", "Hata")
    } 
    this.router.navigate(['/car-list']);
  }

  getByIdBrand(id: number) {
    this.brandService.getById(id).subscribe(response => {
      this.brand = response.data;
      this.brandUpdateForm = this.formBuilder.group({
        id : new FormControl(this.brand.id),
        name : new FormControl(this.brand.name)        
      });
      console.log(this.brand);
    })
  }
}
