import {injectable, /* inject, */ BindingScope} from '@loopback/core';
// import axios from 'axios';

@injectable({ scope: BindingScope.TRANSIENT })
export class ApiWecheerService {
  constructor(/* Add @inject to inject parameters */) { }

  async postUploadImage_ToTraningSet(author: any, traningset_name: any, bottlecap_name: any, url: string) {
    const request = require('request')
    const fs = require('fs');
    try {
      const res = await new Promise(function (resolve: any, reject: any) {
        const options = {
          'method': 'POST',
          'url': `https://api.wecheer.me/image-classification/api/training-sets/${traningset_name}/${bottlecap_name}`,
          'headers': {
            'authority': 'api.wecheer.me',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'authorization': author,
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'origin': 'https://wecheer.me',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://wecheer.me/',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
          },
          body: JSON.stringify({
            "url": url
          })
        };
        request(options, function (error: any, response: any) {
          if (error) reject(error);
          try {
            resolve(response);
          } catch (error_) {
            reject(error_);
          }
        });
      });
      return res
    } catch (error) {
      return null
    }
  }
}
