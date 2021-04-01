import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded: boolean = false;
  currentColor: Color;

  constructor(private colorService: ColorService, 
    private toastrService: ToastrService, 
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.deleteColor(params["id"]);
      }
    })
    this.getColors();
  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
  deleteColor(id: number) {
    let brand: Color = { id: parseInt(id.toString()), name: "" };
    if (confirm("Silmek istediğinden emin misin ?")) {
      this.colorService.delete(brand).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
      })
    } else {
      this.toastrService.info("Silme işlemi iptal edildi", "Uyarı");
    }
    this.router.navigate(['/color']);
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }
  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }
}
