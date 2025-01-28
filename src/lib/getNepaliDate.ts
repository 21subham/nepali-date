import { adToBs } from "@sbmdkl/nepali-date-converter"

import getData from "./getData" // Import the getData function

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
  const nepday = nepaliDays[englishDay] || ""

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

    // Convert AD date to BS date
    const bsDate = adToBs(adDate).toString().split("-")
    const [bsYear, bsMonth, bsDay] = bsDate

    // Fetch tithi for the BS date
    const tithi = await getData(bsDay, bsMonth, bsYear)

    return {
      nepday, // Nepali day (e.g., "सोमबार")
      bsDate, // BS date as an array [year, month, day]
      year, // AD year
      month, // AD month
      date, // AD day
      adDate, // AD date in YYYY-MM-DD format
      monthcalc: monthcalc(bsMonth), // Nepali month name (e.g., "बैशाख")
      tithi // Tithi for the date (e.g., "पञ्चमी")
    }
  } catch (e) {
    console.error("Error in getNepaliDate:", e.message)
    return null
  }
}
