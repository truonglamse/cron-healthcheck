var axios = require("axios");
import { injectable, /* inject, */ BindingScope } from '@loopback/core';
// import axios from 'axios';

@injectable({ scope: BindingScope.TRANSIENT })
export class TelegramService {
  constructor() { }

  // async getWecheerInfo(url: string) {
  //   try {
  //     const response = await axios.get(url);
  //     return response.data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  async sendMessageToChannel(text: any) {
    const res = await new Promise((resolve, reject) => {
      var data = JSON.stringify({
        text: text,
        chat_id: "@factorymachine_error",
      });

      var config = {
        method: "post",
        url: "https://api.telegram.org/bot5358849811:AAEleLRx6CiC7ZLxoxpi1M58zRj5r2Ps8CE/sendMessage",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response: any) {
          return resolve = response.data;
          //console.log(JSON.stringify(response.data));
        })
        .catch(function (error: any) {
          console.log(error);
          reject = error;
        });
    });
    return res
  }

// module.exports = {
//   telegram: {
//     sendMessageToChannel: async function (text: any) {
//       var data = JSON.stringify({
//         text: text,
//         chat_id: "@factorymachine_error",
//       });

//       var config = {
//         method: "post",
//         url: "https://api.telegram.org/bot5358849811:AAEleLRx6CiC7ZLxoxpi1M58zRj5r2Ps8CE/sendMessage",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: data,
//       };

//       axios(config)
//         .then(function (response: any) {
//           return response.data;
//           //console.log(JSON.stringify(response.data));
//         })
//         .catch(function (error: any) {
//           console.log(error);
//         });
//     },
//   },
// };


// const { telegram } = require("./telegram_service")
// telegram.sendMessageToChannel(`Can't get certificate file, status code: ` + certificateInfo.status)
}
