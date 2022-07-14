// const express = require("express");
// const { google } = require("googleapis");
// const { request, name } = req.body;

// const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
// });

// Create client instance for auth
// const client = await auth.getClient();

// Instance of Google Sheets API
// const googleSheets = google.sheets({ version: "v4", auth: client });

// const spreadsheetId = "1YYhuKaHkC_svFZDr_pB7l0o3PDAYzWX7D1zsqHNiAOs";

// // Get metadata about spreadsheet
// const metaData = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId,
// });

// // Read rows from spreadsheet
// const getRows = await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A:A",
// });

// Write row(s) to spreadsheet
// await googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A:B",
//     valueInputOption: "USER_ENTERED",
//     resource: {
//         values: [[request, name]],
//     },
// });
function updateValues() {

    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const service = google.sheets({ version: 'v4', auth });

    const range = "Sheet1!A:E"
    const valueInputOption = "USER_ENTERED"
    const spreadsheetId = "1YYhuKaHkC_svFZDr_pB7l0o3PDAYzWX7D1zsqHNiAOs";
    const resource = {
        values: a
    }
    try {
        const result = service.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });
        // console.log('%d cells updated.', result.data);
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}



const a = [{ "name": "lam", "age": "10", "birth": "10/10/2000" }, { "name": "lam", "age": "10", "birth": "10/10/2000" }, { "name": "lam", "age": "10", "birth": "10/10/2000" }]
const b = [{ "name": "lam", "age": "10", "birth": "10/10/2000" }, { "name": "lam", "age": "10", "birth": "10/10/2000" }, { "name": "lam", "age": "10", "birth": "10/10/2000" }]

async function sheetAutomate() {
    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const service = google.sheets({ version: 'v4', auth, client });


    const getRow = await service.spreadsheets.values.get({
        auth,
        spreadsheetId: '1YYhuKaHkC_svFZDr_pB7l0o3PDAYzWX7D1zsqHNiAOs',
        range: 'Sheet1!A:C',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ]
            ]
        }
    });

    const KeysInSheet = [...(getRow.data?.values.flat() || [])]

    const KeysNoInSheet = [
        // ...new Set([
        //     ...Object.keys(a).filter(key => !KeysInSheet.includes(key)),
        //     ...Object.keys(b).filter(key => !KeysInSheet.includes(key))
        [...(a.flat() || []), ...(b.flat() || [])]
            .filter(({ name }) => !KeysInSheet.includes(name))
            .map(({ name }) => name)
        // ])
    ];

    // const rowTobeAdded = await KeysNoInSheet.map((key, index) => [key, index + 1])

    try {
        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: '1YYhuKaHkC_svFZDr_pB7l0o3PDAYzWX7D1zsqHNiAOs',
            range: 'Sheet1!A:E',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    a
                ]
            }
        });
        console.log('%d cells updated.', result.data);
    } catch (error) {
        console.log(error);
    }
}

// sheetAutomate()

updateValues()