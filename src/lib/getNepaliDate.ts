import { adToBs } from "@sbmdkl/nepali-date-converter"

import getData from "./getData" // Import the getData function

export default async function getNepaliDate() {
  const today = new Date()
  const englishDay = today.toLocaleDateString("en-US", { weekday: "long" })

  //weekday
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

  //mahina
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
    //AD
    const enYear = today.getFullYear().toString()
    const enMonth = (today.getMonth() + 1).toString()
    const enDate = today.getDate().toString()
    const adDate = `${enYear}-${enMonth}-${enDate}`

    const englishMonth = today.toLocaleDateString("en-US", { month: "long" })

    //BS
    const bsDate = adToBs(adDate).toString().split("-")
    const [bsYear, bsMonth, bsDay] = bsDate

    const { singleDayData, bratabandhaData, marriageData } = await getData(
      today.getDate().toString().padStart(2, "0"),
      bsMonth,
      bsYear
    )
    //check
    console.log(monthcalc(bsMonth), (singleDayData + 1).n, ",", bsDate[0])
    console.log(englishMonth.slice(0, 3), enDate, ",", enYear)
    console.log(nepday, singleDayData.t)
    console.log(
      "////////////////////////////////////////////////////////////////////////////////////////////////////////////////"
    )

    //inc
    function Incrementor() {}
    return {
      bsDate,
      enYear,
      enMonth,
      englishMonth,
      enDate,
      adDate,
      nepday,
      monthcalc: monthcalc(bsMonth),
      singleDayData,
      bratabandhaData,
      marriageData
    }
  } catch (e) {
    console.error("Error in getNepaliDate:", e.message)
    return null
  }
}
