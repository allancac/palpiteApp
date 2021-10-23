import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from '../../credenciais.json';
const arquivo = require('../../arquivo.json').id;

export default async (req, res) => {

  try {
    const doc = new GoogleSpreadsheet(arquivo);
    await doc.useServiceAccountAuth(credenciais)
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