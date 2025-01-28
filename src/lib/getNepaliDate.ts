import { adToBs } from "@sbmdkl/nepali-date-converter"

export default function getNepaliDate() {
  const today = new Date()
  today.getDate()
  const englishDay = today.toLocaleDateString("en-US", { weekday: "long" })
  let nepday = ""
  switch (englishDay) {
    case "Sunday":
      nepday = "आइतबार"
      break
    case "Monday":
      nepday = "सोमबार"
      break
    case "Tuesday":
      nepday = "मंगलबार"
      break
    case "Wednesday":
      nepday = "बुधबार"
      break
    case "Thursday":
      nepday = "बिहीबार"
      break
    case "Friday":
      nepday = "शुक्रबार"
      break
    case "Saturday":
      nepday = "शनिबार"
      break
    default:
      break
  }

  try {
    const year = today.getFullYear().toString()
    const month = today.getMonth().toString() + 1
    const date = today.getDate().toString()
    const adDate = `${year}-${month}-${date}`

    const adToBsDate = adToBs(adDate)

    const bsDate = adToBsDate.toString().split("-")

    return { nepday, bsDate, year, month, date, adDate }
  } catch (e) {
    console.log(e.message)
  }
}
