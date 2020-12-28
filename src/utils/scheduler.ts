import Agenda from "agenda";
import { successlog, errorlog, infolog } from "./logger";

class Timer {
  private agenda!: Agenda;

  async connect(uri: string): Promise<void> {
    this.agenda = new Agenda({
      db: {
        address: uri,
        collection: "Timers",
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    }, async (err, res) => {
      if (!err) {
        const timersToRestart = res?.find({ $or: [{ lockedAt: { $exists: true } }, { nextRunAt: { $exists: true } }] });
        timersToRestart?.map(doc => console.log(doc));
        // await Promise.all([
        //   timersToRestart?.map(timer => { 
        //     return 
        //   })
        // ])

        // res?.updateMany({ $or: [{ lockedAt: { $exists: true } }, { nextRunAt: { $exists: true } }] }, {
        //   $set: {
        //     lockedAt: null, nextRunAt: new Date(Date.now() + (1000 * 60 * 5))
        //   }
        // }).then(res => {
        //   console.log(`restarted ${res.modifiedCount} tournament timers`);
        // }).catch(err => console.error(err.message));
      }
    });

    await new Promise((resolve) =>
      this.agenda.once("ready", async () => {
        await this.agenda.start();
        successlog("Timer is running");
        resolve(true);
      })
    );

    this.agenda.on("error", (error) => {
      errorlog(error.message);
    });
  }

  get _agenda() {
    return this.agenda;
  }

  schedule(
    jobName: string,
    jobStartDateTime: Date | string,
    jobFunction: (jobData: any, done: any) => any,
    jobData: any
  ): void {
    if (!this.agenda) {
      errorlog("cannot schedule before init");
      throw new Error();
    }
    this.agenda.define(jobName, { lockLifetime: 10000, concurrency: 100 }, (job, done) => {
      jobFunction(job.attrs.data, done);
    });
    this.agenda.schedule(jobStartDateTime, jobName, jobData);
  }

  repeat(
    jobName: string,
    jobInterval: string,
    jobFunction: (jobData: any, done: any) => any,
    jobData: any
  ): void {
    if (!this.agenda) {
      throw new Error("cannot schedule before init");
    }
    this.agenda.define(jobName, { priority: "highest" }, (job, done) => {
      jobFunction(job.attrs.data, done);
    });
    this.agenda.every(jobInterval, jobName, jobData);
  }

  async cancel(jobName: string) {
    await this.agenda.cancel({ name: jobName });
  }

  // stop() {
  //   return this.agenda
  //     .stop()
  //     .then(() => process.exit(0))
  //     .catch(() => {});
  // }

  async removeAll() {
    const jobsRemoved = await this.agenda.purge();
    infolog(`removed ${jobsRemoved} jobs`);
  }
}

export const timer = new Timer();
