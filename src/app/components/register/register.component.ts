import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  register() {
    if (this.registerForm.valid) {
      let registerModule = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModule).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Başarıyla kaydoldunuz", "Başarılı");
          this.router.navigate(['/login']);
        }
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Hata");
    }
  }
}
