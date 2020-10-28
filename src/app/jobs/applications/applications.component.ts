import { Component, OnInit, Inject } from "@angular/core";
import { LoginService } from "src/app/login/login.service";
import { ApplicationsService } from "./applications.service";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Application } from "./application.model";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent implements OnInit {
  public applications: Application[];
  constructor(
    private loginService: LoginService,
    private applicationsService: ApplicationsService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.getApplicationsOfUser();
  }

  getApplicationsOfUser() {
    const userEmail = this.storage.get(environment.storage.AUTH_EMAIL);
    this.loginService.getUserByEmail(userEmail).subscribe((response) => {
      this.applicationsService.getApplicationsOfUser(response.id).subscribe(
        (res) => {
          console.log(res);
          this.applications = [...res];
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSelect(job) {}

  deleteApplication(id: number) {
    this.applicationsService.deleteApplication(id).subscribe(
      (response) => {
        this.applications = this.applications.filter((appl) => {
          console.log(appl);
          return appl.id !== id;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToJob(id: number) {
    //this.router.navigateByUrl("/applications/add", { state: { job: job } });
  }
}
