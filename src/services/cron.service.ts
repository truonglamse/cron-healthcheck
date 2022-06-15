import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { CronJob, cronJob } from '@loopback/cron';

@cronJob()
export class CronService extends CronJob {

  constructor() {
    super({
      name: 'Cron-Check-Process',
      onTick: async () => {
        await this.runningProcess();
      },
      cronTime: '*/1 * * * * *',
      start: true, // Chạy ngay lập tức
      onComplete: () => {
        console.log(this.name + " Stop")
      }
    });
  }

  async runningProcess() {
    console.log(this.name + " Start : " + new Date().getTime());
  }
}
