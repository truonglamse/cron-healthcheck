import { injectable, /* inject, */ BindingScope, inject } from '@loopback/core';
import { CronJob, cronJob } from '@loopback/cron';
import { repository, Where } from '@loopback/repository';
import { stringify } from 'querystring';
import { certificateinfos } from '../models';
import { CertificateinfosRepository, QctoolfactoryconfigurationsRepository } from '../repositories';
import { TelegramService } from './telegram.service';

@cronJob()
export class CronService extends CronJob {

  constructor(
    @inject('services.TelegramService') private telegramService: TelegramService,
    @repository(CertificateinfosRepository) public certificateinfosRepository: CertificateinfosRepository,
    @repository(QctoolfactoryconfigurationsRepository) public qctoolfactoryconfigurationsRepository: QctoolfactoryconfigurationsRepository,

  ) {
    super({
      name: 'Cron-Check-Process',
      onTick: async () => {
        // console.log('Cron-Check-Process Started!!!');
        console.log('Cron is running...' + new Date().getTime());

        await this.runningProcess();
      },
      cronTime: '5 * * * * *',  // every 5 minutes
      start: true, // Chạy ngay lập tức
      onComplete: () => {
        console.log(this.name + " Stop")
      }
    });
  }

  async runningProcess() {
    try {
      let dataConfig: any = await this.getCertificateName_Using();
      let nameFile = dataConfig[0].certificateFiles.filter((item: any) => item.inUsing == true);

      let count: any = await this.countCertificateinfos({
        certificateFileName: nameFile[0].fileName,
        isAllocated: false
      });

      if (count.count <= 50) {
        let a = await this.telegramService.sendMessageToChannel("The certificate is about to run out, only about : " + count.count + ", file name[" + nameFile[0].fileName + "]");
        console.log(a);
      }
    } catch (error) {
      let b = await this.telegramService.sendMessageToChannel("Exception in Cron-Check-Process: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + "\n}");
      console.log(b);
    }
  }

  async countCertificateinfos(where?: Where<certificateinfos>): Promise<{}> {
    return await this.certificateinfosRepository.count(where);
  }

  async getCertificateName_Using(where?: Where<certificateinfos>): Promise<{}> {
    return await this.qctoolfactoryconfigurationsRepository.find();
  }
}
