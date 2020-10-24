import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { LoginService } from "../login/login.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerValues: any;
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(formValues) {
    this.loginService
      .register(formValues.email, formValues.password)
      .subscribe((response) => {
        this.storage.set(environment.storage.AUTH_TOKEN, response.token);
        console.log(response);
      });
  }
  register(formValues) {
    this.loginService
      .register(formValues.email, formValues.password)
      .subscribe((response) => {
        console.log(response);
      });
  }

  gotologin() {
    this.router.navigate(["login"]);
  }
  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
