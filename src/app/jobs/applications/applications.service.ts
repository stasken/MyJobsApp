import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { environment } from "src/environments/environment";
import { Job } from "../job.model";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Application } from "./application.model";

@Injectable({
  providedIn: "root",
})
export class ApplicationsService {
  public myApiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.myApiUrl = environment.apiUrl;
  }

  /**
   * Service calls
   */

  public addNewApplication(appl: Application): Observable<Application> {
    return this.http
      .post<Application>(this.myApiUrl + "applications", appl, {
        headers: new HttpHeaders({
          Authorization:
            "Bearer " + this.storage.get(environment.storage.AUTH_TOKEN),
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteApplication(id: number): Observable<Application> {
    return this.http
      .delete<Application>(this.myApiUrl + "applications/" + id, {
        headers: new HttpHeaders({
          Authorization:
            "Bearer " + this.storage.get(environment.storage.AUTH_TOKEN),
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getApplicationsOfUser(id: string): Observable<Application[]> {
    return this.http
      .get<Application[]>(this.myApiUrl + "applications/user/" + id, {
        headers: new HttpHeaders({
          Authorization:
            "Bearer " + this.storage.get(environment.storage.AUTH_TOKEN),
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler));
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
