// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from '@loopback/rest';
import { query } from 'express';
import { ElasticService, ApiWecheerService } from '../services';

export class ElasticController {
  constructor(
    @inject('services.ElasticService') protected elastic: ElasticService,
    @inject('services.ApiWecheerService') protected wecheer: ApiWecheerService,
  ) {}
  @get('/getlink-and-upload')
  @response(200, {})
  async getLink(
    @param.query.string('cockie') cockie: string,
    @param.query.string('brand') brand: string,
    @param.query.string('author') author: string,
    @param.query.string('traningset_name') traningset_name: string,
    @param.query.string('bottlecap_name') bottlecap_name: string,
    @param.query.string('bottleCap_id') bottleCap_id: string
  ): Promise<any> {
    let data: any = await this.elastic.getData_DrinkMoment(cockie, brand, bottleCap_id)
    let flag = 1
    for (const iterator of JSON.parse(data.body).hits.hits) {
      let url = iterator.fields['brandInfo.imageCapturedEvent.imageUrl'][0];
      // console.log(url);
      let res: any = await this.wecheer.postUploadImage_ToTraningSet(author, traningset_name, bottlecap_name, url)
      // if(flag === 250){
      //   console.log('\n* ✨ Done *\n');
      //   break
      // }
      if(res.statusCode === 401){
        console.log(res.statusMessage);
        break;
      }
      console.log('✨✨✨✨✨✨✨✨✨✨✨ Running to :[' + flag + '/'+ JSON.parse(data.body).hits.hits.length +'] ✨✨✨✨✨✨✨✨✨✨✨');
      flag +=1
    }
    return true
  }
}



