// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { inject } from '@loopback/core';
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
  ) { }
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
    let flag = 1

    // let data_fake: any
    // let url = data_fake.drinkMoments[0].brandInfo.imageCapturedEvent.imageUrl
    // for (const iterator of data_fake.drinkMoments) {
    //   let url = iterator.brandInfo.imageCapturedEvent.imageUrl;
    //   // console.log(url);
    //   let res: any = await this.wecheer.postUploadImage_ToTraningSet(author, traningset_name, bottlecap_name, url)
    //   if (flag === 110) {
    //     console.log('\n* ✨ Done *\n');
    //     break
    //   }
    //   if (res.statusCode === 401) {
    //     console.log(res.statusMessage);
    //     break;
    //   }
    //   console.log('✨✨✨✨✨✨✨✨✨✨✨ Running to :[' + flag + '/' + data_fake.drinkMoments.length + '] ✨✨✨✨✨✨✨✨✨✨✨');
    //   flag += 1
    // }

    let data: any = await this.elastic.getData_DrinkMoment(cockie, brand, bottleCap_id)
    for (const iterator of JSON.parse(data.body).hits.hits) {
      let url = iterator.fields['brandInfo.imageCapturedEvent.imageUrl'][0];
      // console.log(url);
      let res: any = await this.wecheer.postUploadImage_ToTraningSet(author, traningset_name, bottlecap_name, url)
      if (flag === 250) {
        console.log('\n* ✨ Done *\n');
        break
      }
      if (res.statusCode === 401) {
        console.log(res.statusMessage);
        break;
      }
      console.log('✨✨✨✨✨✨✨✨✨✨✨ Running to :[' + flag + '/' + JSON.parse(data.body).hits.hits.length + '] ✨✨✨✨✨✨✨✨✨✨✨');
      flag += 1
    }
    return true
  }

  @get('/login')
  @response(200, {})
  async accessToken(
    @param.query.string('Cookie') Cookie: string
  ): Promise<any> {
    let a = await this.get(Cookie)
    return a;
  }

  async get(Cookie: any){
    var axios = require('axios');
    var config = {
      method: 'get',
      // url: 'https://insights.wecheer.io/admin/brand?label%5B%5D=carta-blanca-mx',
      url: 'https://insights.wecheer.io/admin/auth/login',
      // headers: {
      //   'Cookie': 'XSRF-TOKEN=eyJpdiI6IlhDWHRnU3JcL0Ixa2IyRDRtZWZrXC9WQT09IiwidmFsdWUiOiJibVE1d3FGdG9XVmd5WlwvU0hOaXAzTnhzTVZJVThrYjJnZ0JBXC8yRTBrMWkzUEhqd0drRnJ0UEI2RHBpcU8yc3Brd0U4NFN0XC9JdkRhOW9NcVFvQXQ3QT09IiwibWFjIjoiMWYwMzBhYmI1YzM3MzhmOWQ4MjQwYmFmNDllZTA0MWMxMDM3ZmJlNTE3YTRjNjJkZjI2MGJjMjU5ZjA3M2RlOCJ9; laravel_session=eyJpdiI6ImluXC9yZW5XbktuUUdjTzVRUWdqZjFBPT0iLCJ2YWx1ZSI6IlFleXgyQ1h0czRWbEdwVFFlOWlZbjNTb1wvVjRUaDRUclM0cys1OHpLRlNyRHd3YnBzWlBRNG9YODFqdW93NThNTHk3bm1hVnV5eHZUaGVGWmt0YU1QUT09IiwibWFjIjoiYTk5MDNjNTJmNTEwYjljYjMzOTAxNTJlMWI0YjRmOWFjNTBjOTE0NDAyMTQwNWZlYmZjNzhjNzcxNzg4OGE2OCJ9'
      // }
    };
    return new Promise((resolve, reject) => {
      axios(config)
      .then(async function (response: any) {

        resolve = response.data;
      })
      .catch(function (error: any) {
        reject = error;
      });
    });
  }
}



