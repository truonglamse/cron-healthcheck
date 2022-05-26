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
    @param.query.string('bottlecap_name') bottlecap_name: string
  ): Promise<any> {
    let data: any = await this.elastic.getData_DrinkMoment(cockie, brand)
    let flag = 1
    for (const iterator of JSON.parse(data.body).hits.hits) {

      let url = iterator.fields['brandInfo.imageCapturedEvent.imageUrl'][0];
      console.log(url);
      let res = await this.wecheer.postUploadImage_ToTraningSet(author, traningset_name, bottlecap_name, url)
      flag +=1
      if(flag === 50 || flag === 100 || flag === 150 || flag === 200 || flag === 250){
        console.log('\n***********************\n');
      }
    }
    return true
  }
}



