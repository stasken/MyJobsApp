import { Injectable, Inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Job } from "./job.model";
import { catchError, retry } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { User } from "../login/user.model";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Injectable({
  providedIn: "root",
})
export class JobsService {
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

  public addNewJob(job: Job): Observable<Job> {
    return this.http
      .post<Job>(this.myApiUrl + "offers", job, {
        headers: new HttpHeaders({
          Authorization:
            "Bearer " + this.storage.get(environment.storage.AUTH_TOKEN),
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteJob(id: number): Observable<Job> {
    return this.http
      .delete<Job>(this.myApiUrl + "offers/" + id, {
        headers: new HttpHeaders({
          Authorization:
            "Bearer " + this.storage.get(environment.storage.AUTH_TOKEN),
        }),
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getJobsOfUser(id: string): Observable<Job[]> {
    return this.http
      .get<Job[]>(this.myApiUrl + "offers/user/" + id, {
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
