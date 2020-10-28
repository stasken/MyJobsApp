import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthGuard } from "./login/auth.guard";
import { JobsComponent } from "./jobs/jobs.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { AddJobComponent } from "./jobs/add-job/add-job.component";
import { AddApplicationComponent } from "./jobs/applications/add-application/add-application.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "jobs",
    component: JobsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "jobs/add",
    component: AddJobComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "applications",
    component: ApplicationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "applications/add",
    component: AddApplicationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: "LoginPage" },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { animation: "RegisterPage" },
  },
  {
    path: "forgotpassword",
    component: ForgotPasswordComponent,
    data: { animation: "ForgotPasswordPage" },
  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

// const routes: Routes = [
//   { path: "", component: HomeComponent },
//   { path: "jobs", component: JobsComponent, canActivate: [AuthGuard]  },
//   { path: "job/:name", component: JobDetailsComponent, canActivate: [AuthGuard]  },
//   { path: "applications", component: ApplicationsComponent, canActivate: [AuthGuard]  },
//   { path: "**", redirectTo: "login", pathMatch: "full" },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
