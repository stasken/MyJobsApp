import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  loggedIn: Boolean;

  ngOnInit(): void {
    const token = this.storage.get(environment.storage.AUTH_TOKEN) || [];
    if (token !== []) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }
}
