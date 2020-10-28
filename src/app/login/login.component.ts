import { Component, OnInit, Inject } from "@angular/core";
import { LoginService } from "./login.service";
import { StorageService, LOCAL_STORAGE } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { switchMap, take, map } from "rxjs/operators";
declare var FB: any;

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

  ngOnInit(): void {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: "364638531321666",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  login(formValues) {
    this.error = false;
    this.loginService.logIn(formValues.email, formValues.password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([""]);
        this.storage.set(environment.storage.AUTH_TOKEN, response.token);
        this.storage.set(environment.storage.AUTH_EMAIL, response.email);
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = true;
      }
    );
    this.isFetching = true;
  }

  // fbLogin() {
  //   FB.login(
  //     (response) => {
  //       if (response.status == "connected") {
  //         //redirect to home page
  //         var url = "/me?fields=name,email";
  //         FB.api(url, function (response) {
  //           return response.email;
  //         });
  //       } else {
  //         return "error";
  //       }
  //     },
  //     { scope: "email" }
  //   );
  // }

  checkEmail($event) {}

  gotoregister() {
    this.router.navigate(["register"]);
  }
  gotoforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
}
