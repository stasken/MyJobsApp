import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

// Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";

// Globals
import { environment } from "src/environments/environment";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register("my-service-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
