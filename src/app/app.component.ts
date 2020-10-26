import { Component, Inject } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Router, RouterOutlet } from "@angular/router";
import { slideInAnimation } from "./animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = "MyJobsApp";
  firstTime: Boolean;
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    const storage_FirstTime =
      this.storage.get(environment.storage.FIRSTTIME_KEY) || [];
    if (storage_FirstTime !== 1) {
      this.firstTime = true;
    } else {
      this.firstTime = false;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  userHasRead() {
    this.storage.set(environment.storage.FIRSTTIME_KEY, 1);
    this.firstTime = false;
  }
}
