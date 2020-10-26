import { Component, OnInit, Inject } from "@angular/core";
import { LoginService } from "../login/login.service";
import { StorageService, LOCAL_STORAGE } from "ngx-webstorage-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  registerValues: any;
  isFetching: boolean = false;
  emailSent: boolean = false;
  wrongPassword: boolean = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  forgotpassword(formValues) {
    this.loginService.forgotpassword(formValues.email);
    /*
    .subscribe((response) => {
      console.log(response);
      this.isFetching = false;
      this.emailSent = true;
    });
    this.isFetching = true;
    */
    this.emailSent = true;
  }

  checkEmail($event) {
    this.wrongPassword = true;
  }

  gotologin() {
    this.router.navigate(["login"]);
  }

  gotoregister() {
    this.router.navigate(["register"]);
  }
}
