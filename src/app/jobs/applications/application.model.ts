import { Job } from "../job.model";

export class Application {
  id: number;
  where: string;
  when: string;
  offer_Id: number;
  User_Id: string;
  offer: Job;
}
