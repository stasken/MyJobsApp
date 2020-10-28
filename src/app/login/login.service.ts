import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Observable, throwError, BehaviorSubject, from } from "rxjs";
import { retry, catchError, map, tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public myApiUrl: string;

  public isAuthenticated(): boolean {
    const currentTokenStorage =
      this.storage.get(environment.storage.AUTH_TOKEN) || [];
    if (currentTokenStorage.length === 0) {
      return false;
    }
    return true;
  }

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.myApiUrl = environment.apiUrl;
  }

  /**
   * Auth calls
   */
  public loginFacebook() {
    const obj = {
      client_id: "364638531321666",
      redirect_uri: "https://www.facebook.com/connect/login_success.html",
      state: "",
    };
    return this.http
      .post("https://www.facebook.com/v8.0/dialog/oauth?", obj)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User>(this.myApiUrl + "users/email/" + email)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public logIn(email: string, password: string): Observable<User> {
    const user = {
      Email: email,
      Password: password,
    };
    return this.http
      .post<User>(this.myApiUrl + "users/login", user)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public register(email: string, password: string): Observable<User> {
    const user = {
      Email: email,
      Password: password,
    };
    return this.http
      .post<User>(this.myApiUrl + "users/register", user)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public logOut() {
    this.storage.remove(environment.storage.AUTH_TOKEN);
    this.storage.remove(environment.storage.AUTH_EMAIL);
  }

  public forgotpassword(formValues) {
    console.log(formValues);
  }

  /**
   * Helper methods
   */

  public errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
