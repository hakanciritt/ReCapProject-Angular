import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm() {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }
  addBrand() {
    if (this.brandForm.valid) {
      let brandModule = Object.assign({}, this.brandForm.value);
      this.brandService.add(brandModule).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
      }, responseError => {
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");            
          }         
        }         
      })
    }else{
      this.toastrService.error("Formunuz eksik","Hata");
    }
  }
}
