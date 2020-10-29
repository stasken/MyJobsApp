import { Component, OnInit, Inject } from "@angular/core";
import { JobsService } from "../jobs-service.service";
import { Job } from "../job.model";
import { LoginService } from "src/app/login/login.service";
import { environment } from "src/environments/environment";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent implements OnInit {
  isLoading: boolean = false;
  userError: boolean = false;
  inputError: boolean = false;
  descriptionError: boolean = false;
  newJobValues: any;

  constructor(
    private loginService: LoginService,
    private jobsService: JobsService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit(): void {}

  checkLength(event) {
    const descr = event.target.value;
    if (descr.length > 200) {
      this.descriptionError = true;
    } else {
      this.descriptionError = false;
    }
  }

  addJob(formValues) {
    if (!formValues.description || formValues.description.length > 200) {
      this.descriptionError = true;
      return;
    }
    this.loginService
      .getUserByEmail(this.storage.get(environment.storage.AUTH_EMAIL))
      .subscribe(
        (res) => {
          const job = new Job();
          job.companyName = formValues.company;
          job.function = formValues.function;
          job.technologies = formValues.technologies;
          job.description = formValues.description;
          job.companyAddress = formValues.address;
          job.companyWebsite = formValues.website;
          job.user_Id = res.id;
          this.jobsService.addNewJob(job).subscribe(
            (response) => {
              this.isLoading = false;
              this.router.navigate(["jobs"]);
            },
            (error) => {
              this.isLoading = false;
              this.inputError = true;
            }
          );
        },
        (err) => {
          this.isLoading = false;
          this.userError = true;
        }
      );
    this.isLoading = true;
  }
}
