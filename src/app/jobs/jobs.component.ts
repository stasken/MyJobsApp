import { Component, OnInit, Inject } from "@angular/core";
import { JobsService } from "./jobs-service.service";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { switchMap, take, tap, map } from "rxjs/operators";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Job } from "./job.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  public jobs: Job[];
  constructor(
    private loginService: LoginService,
    private jobsService: JobsService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.getJobsOfUser();
  }

  getJobsOfUser() {
    const userEmail = this.storage.get(environment.storage.AUTH_EMAIL);
    this.loginService.getUserByEmail(userEmail).subscribe((response) => {
      this.jobsService.getJobsOfUser(response.id).subscribe(
        (res) => {
          console.log(res);
          this.jobs = [...res];
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSelect(job) {}

  deleteJob(id: number) {
    this.jobsService.deleteJob(id).subscribe(
      (response) => {
        this.jobs = this.jobs.filter((job) => {
          console.log(job);
          return job.id !== id;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addApplication(job: Job) {
    this.router.navigateByUrl("/applications/add", { state: { job: job } });
  }
}
