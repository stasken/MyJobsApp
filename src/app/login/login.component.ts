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
  isFetching: boolean = false;
  error: boolean = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(formValues) {
    this.loginService.logIn(formValues.email, formValues.password).subscribe(
      (response) => {
        this.storage.set(environment.storage.AUTH_TOKEN, response.token);
        this.router.navigate([""]);
        console.log(response);
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = true;
      }
    );
    this.isFetching = true;
  }

  fbLogin() {
    /*
    this.loginService.loginFacebook().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    */
  }

  checkEmail($event) {}

  gotoregister() {
    this.router.navigate(["register"]);
  }
  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
