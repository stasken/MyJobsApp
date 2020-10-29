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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatInputModule } from "@angular/material/input";
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from "ngx-scrollbar";

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
import { ApplicationsComponent } from "./jobs/applications/applications.component";
import { JobsService } from "./jobs/jobs-service.service";
import { LoginService } from "./login/login.service";
import { AddJobComponent } from "./jobs/add-job/add-job.component";
import { AddApplicationComponent } from "./jobs/applications/add-application/add-application.component";
import { ApplicationsService } from "./jobs/applications/applications.service";
import { DatetimepickerComponent } from "./jobs/applications/datetimepicker/datetimepicker.component";

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
    DatetimepickerComponent,
  ],
  imports: [
    BrowserModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgScrollbarModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register("my-service-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    LoginService,
    JobsService,
    ApplicationsService,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
