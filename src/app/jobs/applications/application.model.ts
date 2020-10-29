import { Job } from "../job.model";

export class Application {
  id: number;
  where: string;
  when: Date;
  offer_Id: number;
  user_Id: string;
  offer: Job;
}
