import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";

// Globals
import { environment } from "src/environments/environment";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorComponent } from "./error/error.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ProgressSpinnerComponent } from "./progress-spinner/progress-spinner.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { JobsService } from "./jobs/jobs-service.service";
import { LoginService } from "./login/login.service";
import { AddJobComponent } from "./jobs/add-job/add-job.component";
import { AddApplicationComponent } from "./jobs/applications/add-application/add-application.component";
import { ApplicationsService } from "./jobs/applications/applications.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    ForgotPasswordComponent,
    ProgressSpinnerComponent,
    JobsComponent,
    ApplicationsComponent,
    AddJobComponent,
    AddApplicationComponent,
  ],
  imports: [
    BrowserModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register("my-service-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [LoginService, JobsService, ApplicationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
