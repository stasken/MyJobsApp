import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Observable, throwError, BehaviorSubject, from } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public myApiUrl: string;
  private _user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.myApiUrl = environment.apiUrl;
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return this.storage.get(environment.storage.AUTH_TOKEN);
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Auth calls
   */
  public loginFacebook() {
    return this.http
      .get(this.myApiUrl + "signin-facebook")
      .pipe(retry(1), catchError(this.errorHandler));
  }

  /**
   * Service calls
   */

  public isAuthenticated(): boolean {
    const currentTokenStorage =
      this.storage.get(environment.storage.AUTH_TOKEN) || [];
    if (currentTokenStorage.length === 0) {
      return false;
    }
    return true;
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
