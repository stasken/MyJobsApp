import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
/* Local storage */
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { Subject, Subscription } from "rxjs";
//import { EventService } from '../events/event/event.service';

declare var gapi: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @Input() isConnected: boolean;
  @Input() postRequestsAvailable: boolean;
  navbarOpen = false;
  //
  public loggedIn: boolean;
  // tslint:disable-next-line: max-line-length
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isAuthenticated();
  }

  /* Storage */
  public sendLocalPostRequests() {
    const currentPostRequests =
      this.storage.get(environment.storage.POSTREQUESTS_KEY) || [];

    for (const request of currentPostRequests) {
      //this.eventService.saveEvent(request);
    }
    this.storage.remove("local_postrequests");
  }

  public logOut(): void {
    //const googleAuth = gapi.auth2.getAuthInstance();
    //googleAuth.signOut();
    this.loginService.logOut();
    this.storage.remove(environment.storage.AUTH_TOKEN);
    this.router.navigate(["login"]);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
