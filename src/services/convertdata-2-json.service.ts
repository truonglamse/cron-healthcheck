import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { AutomatictestingresultsRepository, BootsRepository, CertificateinfosRepository, ManualtestingresultsRepository, QctoolfactoryconfigurationsRepository, TestingresultsRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class Convertdata2JsonService {
  constructor(
    @repository(TestingresultsRepository)
    public testingresultsRepository: TestingresultsRepository,

    @repository(AutomatictestingresultsRepository)
    public automatictestingresultsRepository: AutomatictestingresultsRepository,

    @repository(BootsRepository)
    public bootsRepository: BootsRepository,

    @repository(CertificateinfosRepository)
    public certificateinfosRepository: CertificateinfosRepository,

    @repository(ManualtestingresultsRepository)
    public manualtestingresultsRepository: ManualtestingresultsRepository,

    @repository(QctoolfactoryconfigurationsRepository)
    public qctoolfactoryconfigurationsRepository: QctoolfactoryconfigurationsRepository,
  ) { }

  async convertData2Json(currentDate: any, fileName: any) {
    let time = await this.formatDate(new Date(await this.timeFormat(7)));
    time = time.replace(/\//gi, '').replace(/, /gi, '').replace(/:/gi, '')

    // let currentDate = '2022-07-13T00:00:00.000+00:00';
    let q: any = [], w: any = [], e: any = [], r: any = [], t: any = [], y: any = [];

    //#endregion Get data from database
    //@ts-ignore
    q = await this.automatictestingresultsRepository.find({ where: { date: { gte: currentDate } } })
    if (q.length > 0) q.push({ filename: "automatictestingresults" })

    //@ts-ignore
    w = await this.bootsRepository.find({})
    if (w.length > 0) w.push({ filename: "boots" })

    //@ts-ignore
    e = await this.certificateinfosRepository.find({ where: { certificateFileName: fileName } })
    if (e.length > 0) e.push({ filename: "certificateinfos" })

    //@ts-ignore
    r = await this.manualtestingresultsRepository.find({ where: { date: { gte: currentDate } } })
    if (r.length > 0) r.push({ filename: "manualtestingresults" })

    //@ts-ignore
    t = await this.qctoolfactoryconfigurationsRepository.find({})
    if (t.length > 0) t.push({ filename: "qctoolfactoryconfigurations" })

    //@ts-ignore
    y = await this.testingresultsRepository.find({ where: { productionDate: { gte: currentDate } } })
    if (y.length > 0) y.push({ filename: "testingresults" })
    //#endregion Get data from database

    let arrJson = [q, w, e, r, t, y];
    let arrPath: string[] = [];

    const fs = require('fs');
    for (const iterator of arrJson) {
      try {
        //Save json to file
        if (iterator.length > 0) {
          let filename = iterator[iterator.length - 1].filename;
          let path = './src/temple_folder/backup_mongodb/' + filename + '_' + time + '.backup';

          fs.writeFile(path, JSON.stringify(iterator), (err: any) => {
            if (err) throw err;
            console.log('Saved!', path);
          });
          arrPath.push(path);
        }
      } catch (error) {
        console.log(error);
        continue;
      }
    }

    //Compress folder to zip
    const archiver = require('archiver');
    const pathZip = './src/temple_folder/backup_mongodb/Backup_' + time + '.zip';
    const output = fs.createWriteStream(pathZip);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    archive.pipe(output);
    for (const iterator of arrPath) {
      archive.file(iterator, { name: iterator.split('/').pop() });
    }
    archive.finalize();
    output.on('close', () => {
      console.log('done');
      //Remove file after compress
      for (const iterator of arrPath) {
        fs.unlink(iterator, (err: any) => {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
    });

    return {
      path: pathZip,
      status: true
    }
  }

  async formatDate(date: any) {
    return new Date(date).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  async timeFormat(num: any) {
    return new Date().setHours(new Date().getHours() + num)
  }
}
