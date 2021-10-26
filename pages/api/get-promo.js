import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials.enc'
import decrypt from '../../decrypt';

export default async (req, res) => {

  try {
    const credentialsDecrypted = decrypt(credentials.encrypted)
    const doc = new GoogleSpreadsheet("1LKilF253TTELGAbxLHzHY423T6Tc7udIeogQEvdC6NQ");
    await doc.useServiceAccountAuth(credentialsDecrypted)
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