import { injectable, /* inject, */ BindingScope, inject } from '@loopback/core';
import { CronJob, cronJob } from '@loopback/cron';
import { repository, Where } from '@loopback/repository';
import { stringify } from 'querystring';
import { certificateinfos } from '../models';
import { CertificateinfosRepository, QctoolfactoryconfigurationsRepository } from '../repositories';
import { Convertdata2JsonService } from './convertdata-2-json.service';
import { GoogleapisService } from './googleapis.service';
import { TelegramService } from './telegram.service';

let flagUpdated = false
let nameFile: any
@cronJob()
export class CronService extends CronJob {
  constructor(
    @inject('services.TelegramService') private telegramService: TelegramService,
    @inject('services.GoogleapisService') private googleapisService: GoogleapisService,
    @inject('services.Convertdata2JsonService') private convertData2JsonService: Convertdata2JsonService,
    @repository(CertificateinfosRepository) public certificateinfosRepository: CertificateinfosRepository,
    @repository(QctoolfactoryconfigurationsRepository) public qctoolfactoryconfigurationsRepository: QctoolfactoryconfigurationsRepository,
  ) {
    super({
      name: 'Process check health !!!',
      onTick: async () => {
        console.log('Cron is running...' + await this.formatDate(new Date(await this.timeFormat(7))));
        await this.runningProcess();
      },
      // cronTime: '*/1 * * * * *',  //every 1s 
      cronTime: '*/2 * * * * ', // every 2 minutes
      start: true, // Chạy ngay lập tức
      onComplete: async () => {
        this.telegramService.sendMessageToChannel("Service cronjob is STOPED !!!" + this.formatDate(new Date(await this.timeFormat(7))));
        console.log(this.name + " Stop")
      }
    });
  }

  async runningProcess() {
    try {
      let dataConfig: any = await this.getCertificateName_Using();
      nameFile = dataConfig[0].certificateFiles.filter((item: any) => item.inUsing == true);
      let count: any = await this.countCertificateinfos({
        certificateFileName: nameFile[0].fileName,
        isAllocated: false
      });

      //Check certificate file exists
      console.log('Available Certificate: ' + count.count);
      if (count.count <= 50) {
        this.telegramService.sendMessageToChannel("{\n\t\t\tAvailable Certificate: " + count.count + ", \n\t\t\tfile name: [" + nameFile[0].fileName + "]\n}");
      }

      //Set week number for production code
      if (await this.timeStartUpdateWeek()) {
        this.setWeekProd();
      }

      //Backup mongoDb to google drive (Convert to JSON file)
      if (await this.timeStartBackupDB() && !flagUpdated) {
        this.backupStart();
      }

      //
      //
      //
    } catch (error) {
      this.telegramService.sendMessageToChannel("Exception in Cron-Check-Process: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + ", \n\t\t\tdate: " + this.formatDate(new Date(await this.timeFormat(7))) + "\n}");
    }
  }

  async backupStart() {
    try {
      let currentDate = (new Date().getFullYear()) + "-" + ((new Date().getMonth() + 1).toString().length == 1 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth())) + "-" + (new Date().getDate()) + ('T00:00:00.000+00:00');
      let file = await this.convertData2JsonService.convertData2Json(currentDate, nameFile[0].fileName);
      this.googleapisService.uploadFile(file.path)
      this.telegramService.sendMessageToChannel("Backup mongoDB today completed 🎉🎉🎉 \n{\n\t\t\tfilename: " + file.path.replace('./src/temple_folder/backup_mongodb/', '') + ",\n\t\t\tdate: " + this.formatDate(new Date(await this.timeFormat(7))) + "\n}");
      flagUpdated = true
    } catch (error) {
      this.telegramService.sendMessageToChannel("Exception in Backup mongoDB: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + ", \n\t\t\tdate: " + this.formatDate(new Date(await this.timeFormat(7))) + "\n}");
    }
  }

  async countCertificateinfos(where?: Where<certificateinfos>): Promise<{}> {
    return await this.certificateinfosRepository.count(where);
  }

  async getCertificateName_Using(where?: Where<certificateinfos>): Promise<{}> {
    return await this.qctoolfactoryconfigurationsRepository.find();
  }

  async setWeekProd() {
    try {
      let info: any = await this.qctoolfactoryconfigurationsRepository.findOne()
      let productionCode = info.efuseConfig.productionCode.substr(0, 6)
      let time = await this.getWeekNumber(new Date(await this.timeFormat(7)))
      let code = productionCode + time[1]
      let a = await this.qctoolfactoryconfigurationsRepository.updateById(info?._id, {
        //@ts-ignore
        'efuseConfig.productionCode': code
      }).then(() => {
        this.telegramService.sendMessageToChannel("Update week number success, from " + info.efuseConfig.productionCode + " to " + code);
      })
    } catch (error) {
      let b = await this.telegramService.sendMessageToChannel("Exception in Update week number: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + ", \n\t\t\tdate: " + this.formatDate(new Date(await this.timeFormat(7))) + "\n}");
      console.log(b);
    }
  }

  async getWeekNumber(d: any) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo: any = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  }

  async timeFormat(num: any) {
    return new Date().setHours(new Date().getHours() + num)
  }

  async timeStartUpdateWeek() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(await this.timeFormat(7));
    let day = weekday[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (day == "Monday" && hours == 0 && (minutes >= 0 && minutes <= 5)) {
      return true
    }
    else {
      return false
    }
  }

  async timeStartBackupDB() {
    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(await this.timeFormat(7));
    // let day = weekday[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();

    if (hours == 23 && (minutes > 2 && minutes < 8)) {
      flagUpdated = false
    }
    if (hours == 23 && (minutes >= 0 && minutes <= 2)) {
      return true
    }
    else {
      return false
    }
  }

  async formatDate(date: any) {
    return new Date(date).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }
}
