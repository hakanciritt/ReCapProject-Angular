import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
 
  addColor() {
    if (this.colorForm.valid) {
      let colorModule = Object.assign({}, this.colorForm.value);
      this.colorService.add(colorModule).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/color']);

      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası");
          }
        } 
      }) 
    } else {
      this.toastrService.error("Form boş geçilemez", "Hata");
    }
  }
  createColorAddForm() {
    this.colorForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }


}
