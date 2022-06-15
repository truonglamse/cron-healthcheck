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
      cronTime: '*/1 * * * * *', // */10 * * * * * Every ten second || 00 44 22 * * 0-6 // chạy lúc 22h44p hằng đêm || ss mm hh dd MM xxx
      start: false, // Chạy ngay lập tức
      onComplete: () => {
        console.log(this.name + " Stop")
      }
    });
  }

  async runningProcess() {
    console.log(this.name + " Start : " + new Date().getTime());
  }
}
