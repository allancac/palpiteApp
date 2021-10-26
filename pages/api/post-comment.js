import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';

const arquivo = process.env.SHEET_ID
const keys = []
keys.push(process.env.SHEET_PRIVATE_KEY1)
keys.push(process.env.SHEET_PRIVATE_KEY2)
keys.push(process.env.SHEET_PRIVATE_KEY3)
const keyString = keys.join("")
// const key = process.env.SHEET_PRIVATE_KEY
const email = process.env.SHEET_CLIENT_EMAIL

const genCupom = () => {
  let cupom = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return `${cupom.substr(0, 4)}-${cupom.substr(4, 4)}-${cupom.substr(8, 4)}`
}
export default async (req, res) => {

  try {
    const doc = new GoogleSpreadsheet(arquivo);
    await doc.useServiceAccountAuth({
      type: "service_account",
      project_id: "palpitebox-329519",
      private_key_id: "9b4a821b7174827bd6678fbfdb73e229947fa2df",
      private_key: keyString,
      client_email: email,
      client_id: "115357659919977471489",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/palpitebox%40palpitebox-329519.iam.gserviceaccount.com"
    })
    await doc.loadInfo();
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells('A2:B4');

    const cells = []
    cells.push(sheetConfig.getCell(1, 1).value)
    cells.push(sheetConfig.getCell(2, 1).value)

    let cupomValue = ''
    let promoValue = ''


    if (cells[0] === true) {
      cupomValue = genCupom()
      promoValue = cells[1]
    }

    const row =
    {
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Critica: data.Critica,
      Nota: data.Nota,
      Cupom: cupomValue,
      Promo: promoValue,
      Data_preenchimento: moment().format('DD/MM/YYYY HH:mm:ss')
    }

    const sheet = doc.sheetsByIndex[1];
    await sheet.addRow(row);
    res.end(JSON.stringify({
      showCupom: cupomValue !== '',
      cupomValue,
      promoValue,
      data: row.Data_preenchimento
    }))

  } catch (error) {
    return error.message;
  }

}