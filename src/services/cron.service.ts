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
      let nameFile = dataConfig[0].certificateFiles.filter((item: any) => item.inUsing == true);

      let count: any = await this.countCertificateinfos({
        certificateFileName: nameFile[0].fileName,
        isAllocated: false
      });

      console.log('Available Certificate: ' + count.count);
      if (count.count <= 50) {
        let a = await this.telegramService.sendMessageToChannel("The certificate is about to run out, only about : " + count.count + ", file name[" + nameFile[0].fileName + "]");
        console.log(a);
      }

      //Set week number for production code
      if(await this.timeStart()){
        await this.setWeekProd();
      }

    } catch (error) {
      this.telegramService.sendMessageToChannel("Exception in Cron-Check-Process: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + ", \n\t\t\tdate: "+ this.formatDate(new Date(await this.timeFormat(7))) +"\n}");
    }
  }

  async countCertificateinfos(where?: Where<certificateinfos>): Promise<{}> {
    return await this.certificateinfosRepository.count(where);
  }

  async getCertificateName_Using(where?: Where<certificateinfos>): Promise<{}> {
    return await this.qctoolfactoryconfigurationsRepository.find();
  }

  async setWeekProd(){
    let info: any = await this.qctoolfactoryconfigurationsRepository.findOne()
    let productionCode = info.efuseConfig.productionCode.substr(0,6)
    let time =await this.getWeekNumber(new Date(await this.timeFormat(7)))
    let code = productionCode + time[1]

    try {
      let a = await this.qctoolfactoryconfigurationsRepository.updateById(info?._id, {
        //@ts-ignore
        'efuseConfig.productionCode': code
      }).then(()=> {
        this.telegramService.sendMessageToChannel("Update week number success, from "+ info.efuseConfig.productionCode +" to " + code);
      })
    } catch (error) {
      let b = await this.telegramService.sendMessageToChannel("Exception in Update week nember: \n{\n\t\t\tname: " + error.name + ", \n\t\t\terror: " + error.message + ", \n\t\t\tdate: "+ this.formatDate(new Date(await this.timeFormat(7))) +"\n}");
      console.log(b);
    }
  }

  async getWeekNumber(d: any) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let weekNo: any = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }

  async timeFormat(num: any){
    return new Date().setHours(new Date().getHours() + num)
  }

  async timeStart(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(await this.timeFormat(7));
    let day = weekday[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if(day == "Monday" && hours == 0 && (minutes >= 0 && minutes <= 5)){
      return true
    }
    else{
      return false
    }
  }

  async formatDate(date: any){
    return new Date(date).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "numeric", hour : "2-digit", minute : "2-digit", second : "2-digit"})
  }
}
