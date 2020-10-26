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
  isFetching: boolean = false;
  wrongPassword: boolean = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  register(formValues) {
    if (formValues.secondPassword !== formValues.password) {
      this.wrongPassword = true;
    } else {
      this.loginService
        .register(formValues.email, formValues.password)
        .subscribe((response) => {
          console.log(response);
          this.isFetching = false;
          this.router.navigate(["login"]);
        });
      this.isFetching = true;
    }
  }

  checkEmail($event) {
    this.wrongPassword = true;
  }

  keyUpPassword($event) {
    this.wrongPassword = true;
  }

  gotologin() {
    this.router.navigate(["login"]);
  }

  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
