import { Job } from "../jobs/job.model";

export class User {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
  token: string;
  offers: Job[];
}
