import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    if (this.loginForm.valid) {
      let loginModule = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModule).subscribe(response => {
        this.localStorageService.add("token", response.data.token.toString());
        this.toastrService.info(response.message, "Bilgilendirme");

        console.log(this.authService.getUser())
        console.log(response);
      })

    } else {
      this.toastrService.error("Formunuz eksik", "Hata");
    }
  }
}
