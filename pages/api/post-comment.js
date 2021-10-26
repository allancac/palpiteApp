import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';
import credentials from '../../credentials.enc'
import decrypt from '../../decrypt';


const genCupom = () => {
  let cupom = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return `${cupom.substr(0, 4)}-${cupom.substr(4, 4)}-${cupom.substr(8, 4)}`
}
export default async (req, res) => {

  try {
    const credentialsDecrypted = decrypt(credentials.encrypted)
    const doc = new GoogleSpreadsheet("1LKilF253TTELGAbxLHzHY423T6Tc7udIeogQEvdC6NQ");
    await doc.useServiceAccountAuth(credentialsDecrypted)
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