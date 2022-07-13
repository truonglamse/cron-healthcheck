/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const GoogleAuth = require('google-auth-library');

const CLIENT_ID = '399963432198-enmvu15t0oaf187jjpjrl9o2mfeatq48.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04MACw-DsiFeUCgYIARAAGAQSNwF-L9IreTyUuA93a2l8W5IEJt6YDXi8syLEFCnr-VGUH9r5PrjBVtwazWRhGQVhQW9sUt-_NvU';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

// const SCOPES = [
//   "https://www.googleapis.com/auth/drive",
//   "https://www.googleapis.com/auth/script.projects",
//   "https://www.googleapis.com/auth/spreadsheets"
// ];




// // var url = oauth2Client.refresh_token();


// // var url = oauth2Client.generateAuthUrl({
// //   access_type: 'offline',
// //   scope: SCOPES,
// //   prompt: 'consent'
// // });

// // console.log('URL', url);

// var axios = require("axios").default;
// // var options = {
// //   method: 'POST',
// //   url: 'https://www.googleapis.com/auth/drive',
// //   headers: {'content-type': 'application/x-www-form-urlencoded'},
// //   data: new URLSearchParams({
// //     grant_type: 'authorization_code',
// //     client_id: CLIENT_ID,
// //     client_secret: CLIENT_SECRET,
// //     code: 'refresh_token',
// //     redirect_uri: REDIRECT_URI
// //   })
// // };

// // axios.request(options).then(function (response) {
// //   let a = response.data
// // }).catch(function (error) {
// //   console.error(error);
// // });

// var options = {
//   method: 'POST',
//   url: 'https://oauth2.googleapis.com/token HTTP/1.1/code=4%2F0AdQt8qh2eHM5JEuWBnRCXCgN_tVK-RyS-Zt1Yg2vTbywglh8XrcTa1zz90cjGScE1PJ3Eg&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=399963432198-enmvu15t0oaf187jjpjrl9o2mfeatq48.apps.googleusercontent.com&client_secret=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&scope=&grant_type=authorization_code',
//   // headers: {
//   //   'Host': 'oauth2.googleapis.com',
//   //   'Content-length': 317,
//   //   'content-type': 'application/x-www-form-urlencoded',
//   //   'user-agent': 'google-oauth-playground'
//   // },
//   // data: new URLSearchParams({
//   //   grant_type: 'authorization_code',
//   //   client_id: CLIENT_ID,
//   //   client_secret: CLIENT_SECRET,
//   //   code: 'refresh_token',
//   //   redirect_uri: REDIRECT_URI
//   // })
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

// console.log('1111');




// uploadToFolder('1VOLqQMLNhQ6HzFoyN-LFqGz2huQCdOkq');

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, 'photo.jpg');
let fileId
async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: new Date().getTime() + '.jpg', //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });
    // console.log(response.data);
    fileId = response.data.id;
  } catch (error) {
    console.log(error.message);
  }
}

// uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: 'YOUR FILE ID',
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

async function generatePublicUrl() {
  try {
    const fileId = 'YOUR FILE ID';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

// generatePublicUrl();

async function uploadToFolder(folderId) {
  // TODO(developer): set folder Id
  // folderId = '1lWo8HghUBd-3mN4s98ArNFMdqmhqCXH7';
  const fileMetadata = {
    name: new Date().getTime() + '.jpg',
    // 'title': 'photo.jpg',
    'parents': [{id: folderId}]
  };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('File Id:', file.data);
    return file.data.id;
  } catch (err) {
    console.log(err);
  }
}

// uploadToFolder('16bfbtoegt7p-OyTiVCT_pk6PRwfUvW5i');
// [END drive_upload_to_folder]

async function moveFileToFolder(fileId, folderId) {
  try {
    // Retrieve the existing parents to remove
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'parents',
    });

    // Move the file to the new folder
    const previousParents = file.data.parents.map(function(parent) {
      return parent.id;
    }).join(',');
    const files = await drive.files.update({
      fileId: fileId,
      addParents: folderId,
      removeParents: previousParents,
      fields: 'id, parents',
    });
    console.log(files.status);
    return files.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

uploadFile().then(()=> {
  moveFileToFolder(fileId,'16bfbtoegt7p-OyTiVCT_pk6PRwfUvW5i');
});




