import { injectable, /* inject, */ BindingScope } from '@loopback/core';
// import axios from 'axios';

@injectable({ scope: BindingScope.TRANSIENT })
export class ElasticService {
  constructor(/* Add @inject to inject parameters */) { }

  async getData_DrinkMoment(cookie: any, brand: any, bottleCap_id: any) {
    const request = require('request')
    const fs = require('fs');
    try {
      const res = await new Promise(function (resolve: any, reject: any) {
        const options = {
          'method': 'POST',
          'url': `https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243/api/console/proxy?path=prod-co-drink-moment-v2%2F_search&method=GET`,
          'headers': {
            'authority': '48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'accept': 'text/plain, */*; q=0.01',
            'content-type': 'application/json',
            'kbn-xsrf': 'kibana',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'origin': 'https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243/app/dev_tools',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'cookie': cookie
          },
          body: JSON.stringify({
            "size": 250,
            "query" : {
              "bool" : {
                "must" : [
                  // {
                  //   "wildcard" : {
                  //     "brandInfo.imageCapturedEvent.json.HPI.keyword" : {
                  //       "wildcard" : "*3e3*",
                  //       "boost" : 1.0
                  //     }
                  //   }
                  // },
                  {
                    "bool" : {
                      "must" : [
                        {
                          "term" : {
                            "brandInfo.bottleCap.brand.keyword" : {
                              "value" : brand,
                              "boost" : 1.0
                            }
                          }
                        },
                        {
                          "term" : {
                            "brandInfo.bottleCap.id.keyword" : {
                              "value" : bottleCap_id,
                              "boost" : 1.0
                            }
                          }
                        }
                      ],
                      "adjust_pure_negative" : true,
                      "boost" : 1.0
                    }
                  }
                ],
                "adjust_pure_negative" : true,
                "boost" : 1.0
              }
            },
            "_source": false,
            "fields": [
              {
                "field": "brandInfo.imageCapturedEvent.imageUrl"
              },
              {
                "field": "brandInfo.bottleCap.brand"
              }
            ],
            "sort": [
              {
                "_doc": {
                  "order": "asc"
                }
              }
            ]
          })
        };
        console.log(options.body);
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

    // var request = require('request');
    // var options = {
    //   'method': 'POST',
    //   'url': 'https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243/api/console/proxy?path=prod-co-drink-moment-v2%2F_search&method=GET',
    //   'headers': {
    //     'authority': '48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243',
    //     'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    //     'accept': 'text/plain, */*; q=0.01',
    //     'content-type': 'application/json',
    //     'kbn-xsrf': 'kibana',
    //     'sec-ch-ua-mobile': '?0',
    //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
    //     'sec-ch-ua-platform': '"macOS"',
    //     'origin': 'https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243',
    //     'sec-fetch-site': 'same-origin',
    //     'sec-fetch-mode': 'cors',
    //     'sec-fetch-dest': 'empty',
    //     'referer': 'https://48f628f45b3f4e55bf99c18a9f7b35f0.ap-southeast-1.aws.found.io:9243/app/dev_tools',
    //     'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    //     'cookie': 'sid=Fe26.2**2b960ed12fc8b5414af724dfdee847d9cd8869dce45c6168288d13693dd4bc16*z6yInEaIFKT0xG4T9Adg3w*kU5KShm3dgWURlJ0F7sInzkeb-3JZ4FOMMcIO709jw-oT-0NnaqcrJvAIFCu3wYDEot41gd9jDcXjZxGkrzZ9mJK6A_lofAl_yHZxRhz7PNrteH8KErTbpaNRHVUJWUDyTNpdbFEP0YwDQMWfIgoM87j4-GOxscTwAZbf5zy8pa8sS7qPu0s8fDOqGTp5bxpIq1fOKwXjUvm8uqpUyF-I--CCEB-zekIEsq6HOsTUNw-LM1EIrL8ivo_kRT254C8**283efb92f22111334d382d0638835f498f506677fa240898c0fa788d916b0a21*A89HRAHk9EkzmzT2FRXR1SrdydHa747eY13CdPioC7I; sid=Fe26.2**b19d60be369ccd2bc3d3cf5355a697f519697e4ef0ec0333fa67c8162e2ae0b5*mRZRfePd6r10m_bc0E_76A*LhCbnwvkLA5vdpVYw790d0aVXkpxD3xVw8qphYvPF84YoogHzJqBPv7TCxIZ5I8Y_GpV79Et6sgyvE2ixgxfWv3H97KyCeqkrYmc6hxhKUB2AKxHbaVq-LpGalmHm4Ens1yHoUyeDos-51OPBza9nDgn7yGykMTfjMEoo36CcItcnmMrhfmH9bLSVU88ZLcvf4n4My9-SGdNbqRb5BG4xWOEDMJ5Ic3w6GT5ImQltcl5wsv1jxIpwM82X_ztGSeZ**dcec6038defd88f4581ee22eb3810ededdb4b11a290d135083d4317134c79064*TKARIZd3N5gbZ3_f4xQMwvb6Y5_Eu6MYb5Z2oVRBXcw'
    //   },
    //   body: JSON.stringify({
    //     "size": 1000,
    //     "query": {
    //       "bool": {
    //         "must": [
    //           {
    //             "wildcard": {
    //               "brandInfo.imageCapturedEvent.json.HPI.keyword": {
    //                 "wildcard": "*3e3*",
    //                 "boost": 1
    //               }
    //             }
    //           },
    //           {
    //             "term": {
    //               "brandInfo.bottleCap.brand.keyword": {
    //                 "value": "Tiger",
    //                 "boost": 1
    //               }
    //             }
    //           }
    //         ],
    //         "adjust_pure_negative": true,
    //         "boost": 1
    //       }
    //     },
    //     "_source": false,
    //     "fields": [
    //       {
    //         "field": "brandInfo.imageCapturedEvent.imageUrl"
    //       },
    //       {
    //         "field": "brandInfo.bottleCap.brand"
    //       }
    //     ],
    //     "sort": [
    //       {
    //         "_doc": {
    //           "order": "asc"
    //         }
    //       }
    //     ]
    //   })

    // };
    // await request(options, function (error: any, response: any) {
    //   if (error) throw new Error(error);
    //   // console.log(response.body);
    //   return response.body
    // });

  }
}
