import { adToBs } from "@sbmdkl/nepali-date-converter"

import getData from "./getData"

export default async function getNepaliDate() {
  const today = new Date()
  const englishDay = today.toLocaleDateString("en-US", { weekday: "long" })

  const nepaliDays = {
    Sunday: "आइतबार",
    Monday: "सोमबार",
    Tuesday: "मंगलबार",
    Wednesday: "बुधबार",
    Thursday: "बिहीबार",
    Friday: "शुक्रबार",
    Saturday: "शनिबार"
  }
  const nepday = nepaliDays[englishDay]

  const Months = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भदौ",
    "असोज",
    "कार्तिक",
    "मंसिर",
    "पुष",
    "माघ",
    "फाल्गुन",
    "चैत्र"
  ]
  const monthcalc = (month: string) => Months[parseInt(month) - 1]

  try {
    const year = today.getFullYear().toString()
    const month = (today.getMonth() + 1).toString()
    const date = today.getDate().toString()
    const adDate = `${year}-${month}-${date}`

    const bsDate = adToBs(adDate).toString().split("-")
    const [bsYear, bsMonth] = bsDate

    const tithi = await getData(today.getDate().toString(), bsMonth, bsYear)

    return {
      nepday,
      bsDate,
      year,
      month,
      date,
      adDate,
      monthcalc: monthcalc(bsMonth),
      tithi
    }
  } catch (e) {
    console.error("Error in getNepaliDate:", e.message)
    return null
  }
}
