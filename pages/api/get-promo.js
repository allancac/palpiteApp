import { GoogleSpreadsheet } from 'google-spreadsheet';

const arquivo = process.env.SHEET_ID
const key = process.env.SHEET_PRIVATE_KEY
console.log(key)
const email = process.env.SHEET_CLIENT_EMAIL

export default async (req, res) => {

  try {
    const doc = new GoogleSpreadsheet(arquivo);
    await doc.useServiceAccountAuth({
      type: "service_account",
      project_id: "palpitebox-329519",
      private_key_id: "9b4a821b7174827bd6678fbfdb73e229947fa2df",
      private_key: key,
      client_email: email,
      client_id: "115357659919977471489",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/palpitebox%40palpitebox-329519.iam.gserviceaccount.com"
    })
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[2];
    await sheet.loadCells('A2:B4');

    const cell = []
    cell.push(sheet.getCell(1, 1).value)
    cell.push(sheet.getCell(2, 1).value)
    cell.push(sheet.getCell(3, 1).value)

    res.end(JSON.stringify({
      showCoupon: cell[0],
      discount: cell[1],
      message: cell[2].split("%")


    }))

  } catch (error) {
    return error;
  }


}