import { adToBs } from "@sbmdkl/nepali-date-converter"

export default function getNepaliDate() {
  try {
    const today = new Date()
    today.getDate()

    const year = today.getFullYear().toString()
    const month = today.getMonth().toString() + 1
    const date = today.getDate().toString()
    const adDate = `${year}-${month}-${date}`

    const adToBsDate = adToBs(adDate)

    const bsDate = adToBsDate.toString().split("-")

    return bsDate
  } catch (e) {
    console.log(e.message)
  }
}
