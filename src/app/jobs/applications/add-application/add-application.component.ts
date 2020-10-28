import { Component, OnInit, Input, Inject } from "@angular/core";
import { Job } from "../../job.model";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { LoginService } from "src/app/login/login.service";
import { JobsService } from "../../jobs-service.service";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Application } from "../application.model";
import { ApplicationsService } from "../applications.service";

@Component({
  selector: "app-add-application",
  templateUrl: "./add-application.component.html",
  styleUrls: ["./add-application.component.scss"],
})
export class AddApplicationComponent implements OnInit {
  job: Job;

  constructor(
    private loginService: LoginService,
    private applicationsService: ApplicationsService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.job = this.router.getCurrentNavigation().extras.state.job;
  }

  ngOnInit(): void {}
  isLoading: boolean = false;
  error: boolean = false;
  newAppValues: any;

  addApp(formValues) {
    if (formValues.where.length <= 0 || formValues.when.length <= 0) {
      this.error = true;
      return;
    }
    this.loginService
      .getUserByEmail(this.storage.get(environment.storage.AUTH_EMAIL))
      .subscribe(
        (res) => {
          const appl = new Application();
          appl.where = formValues.address;
          appl.when = formValues.website;
          appl.offer_Id = this.job.id;
          this.applicationsService.addNewApplication(appl).subscribe(
            (response) => {
              this.isLoading = false;
              this.router.navigate([""]);
            },
            (error) => {
              this.error = true;
            }
          );
        },
        (err) => {
          this.error = true;
        }
      );
    this.isLoading = true;
  }
}
