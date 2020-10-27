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
  wrongSamePassword: boolean = false;
  wrongEmail: boolean = false;
  error: boolean = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  register(formValues) {
    console.log(formValues);
    if (
      formValues.secondPassword !== formValues.password ||
      formValues.password == null
    ) {
      if (formValues.email == null) {
        this.wrongEmail = true;
      }
      this.wrongSamePassword = true;
      this.error = true;
    } else if (formValues.email == null) {
      this.wrongEmail = true;
      this.error = true;
    } else {
      this.loginService
        .register(formValues.email, formValues.password)
        .subscribe(
          (response) => {
            console.log(response);
            this.isFetching = false;
            this.router.navigate(["login"]);
          },
          (error) => {
            this.error = true;
            this.isFetching = false;
          }
        );
      this.isFetching = true;
    }
  }

  checkEmail(event: any) {
    this.wrongEmail = true;
    const email = event.target.value;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.wrongEmail = !re.test(email);
  }

  keyUpPassword(event: any) {
    var regexp = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^_&*])(?=.{8,})"
    );
    const pass = event.target.value;
    this.wrongPassword = !regexp.test(pass);
  }

  gotologin() {
    this.router.navigate(["login"]);
  }

  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
