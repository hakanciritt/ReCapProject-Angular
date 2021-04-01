import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import {FormControl,FormBuilder,Validators,FormGroup} from '@angular/forms'
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router,
    private colorService:ColorService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getByColorId(params["id"]);
      }
    })
  }
  createUpdateColorForm(){
    this.colorUpdateForm=this.formBuilder.group({
      id:['',Validators.required],
      name:['',Validators.required]
    })
  }
  getByColorId(id: number) {
    this.colorService.getById(id).subscribe(response => {
      this.color = response.data;
      this.colorUpdateForm = this.formBuilder.group({
        id : new FormControl(this.color.id),
        name : new FormControl(this.color.name)        
      });
      console.log(this.color);
    })
  }
  colorUpdate(){
    if (this.colorUpdateForm.valid) {
      let brandModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
      }, responseError => {
        this.toastrService.success(responseError.message, "Hata")
      })
    } else {
      this.toastrService.error("Form eksik", "Hata")
    }
    this.router.navigate(['/color']);
  }

}
