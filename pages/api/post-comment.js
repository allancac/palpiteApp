import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from '../../credenciais.json';
import moment from 'moment';
const arquivo = require('../../arquivo.json').id;

const genCupom = () => {
  let cupom = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return `${cupom.substr(0, 4)}-${cupom.substr(4, 4)}-${cupom.substr(8, 4)}`
}
export default async (req, res) => {

  try {
    const doc = new GoogleSpreadsheet(arquivo);
    await doc.useServiceAccountAuth(credenciais)
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
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      critica: data.critica,
      nota: data.nota,
      cupom: cupomValue,
      promo: promoValue,
      data_preenchimento: moment().format('DD/MM/YYYY HH:mm:ss')
    }

    const sheet = doc.sheetsByIndex[1];
    await sheet.addRow(row);
    res.end(req.body)

  } catch (error) {
    return error.message;
  }

}