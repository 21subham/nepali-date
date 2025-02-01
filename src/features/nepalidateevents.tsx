import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import getNepaliDate from "~lib/getNepaliDate"

import Bratabandha from "./bratabandha-date"
import DailyEvent from "./daily-event"
import Marrige from "./marrige-date"

interface IDay {
  n: string
  e: string
  t: string
  f: string
  h: boolean
  d: number
}
export interface INepaliDate {
  bsDate: string[]
  enYear: string
  enMonth: string
  enDate: string
  englishMonth: string
  monthcalc: string
  nepday: string
  singleDayData: IDay
  bratabandhaData: string
  marriageData: string
}

export default function NepaliDateFestivals() {
  const [nepaliDate, setNepaliDate] = useState<INepaliDate | null>(null)

  useEffect(() => {
    const fetchNepaliDate = async () => {
      try {
        const dateData = await getNepaliDate()
        if (dateData) {
          setNepaliDate(dateData)
        }
      } catch (error) {
        console.error("Error fetching Nepali date:", error)
      }
    }

    fetchNepaliDate()
  }, []) // Fixed issue

  if (!nepaliDate) {
    return <div>Loading Nepali Date...</div>
  }

  const {
    nepday,
    bsDate,
    englishMonth,
    enDate,
    enYear,
    monthcalc,
    singleDayData
  } = nepaliDate

  return (
    <div className="plasmo-w-80 plasmo-bg-red-50 plasmo-rounded-xl plasmo-shadow-lg">
      <div className="plasmo-bg-red-800 plasmo-text-white plasmo-p-4 plasmo-my-1 plasmo-m-2 plasmo-rounded-lg">
        <h1 className="plasmo-text-center plasmo-font-bold plasmo-text-2xl">
          {monthcalc} {singleDayData.n}, {bsDate[0]}
        </h1>
        <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
          <button
            className="plasmo-w-8 plasmo-h-8 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full plasmo-hover:bg-white/20 plasmo-transition-colors"
            aria-label="Previous">
            <ChevronLeft className="plasmo-h-4 plasmo-w-4" />
          </button>
          <p className="plasmo-text-center plasmo-text-sm">
            {englishMonth.slice(0, 3)} {enDate},{enYear}
          </p>
          <button
            className="plasmo-w-8 plasmo-h-8 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full plasmo-hover:bg-white/20 plasmo-transition-colors"
            aria-label="Next">
            <ChevronRight className="plasmo-h-4 plasmo-w-4" />
          </button>
        </div>
        <p className="plasmo-text-center plasmo-text-lg plasmo-mt-2">
          {nepday}, {nepaliDate.singleDayData.t || "Tithi Not Available"}
        </p>
      </div>

      {/* bottom half */}
      <div className="plasmo-p-4 plasmo-m-0">
        <div className="plasmo-flex plasmo-items-center plasmo-mb-4">
          <Calendar className="plasmo-mr-2 plasmo-h-5 plasmo-w-5 plasmo-text-red-800" />
          <h2 className="plasmo-text-lg plasmo-font-semibold">आजका पर्वहरू</h2>
        </div>
      </div>
    </div>
  )
}
