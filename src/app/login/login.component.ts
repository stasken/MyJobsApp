import { Component, OnInit, Inject } from "@angular/core";
import { LoginService } from "./login.service";
import { StorageService, LOCAL_STORAGE } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginValues: any;
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(formValues) {
    this.loginService
      .logIn(formValues.email, formValues.password)
      .subscribe((response) => {
        this.storage.get(environment.storage.AUTH_TOKEN) || [];
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

  gotoregister() {
    this.router.navigate(["register"]);
  }
  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
