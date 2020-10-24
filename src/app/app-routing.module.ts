import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./login/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
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
