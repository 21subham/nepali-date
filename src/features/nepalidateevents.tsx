import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import getNepaliDate from "~lib/getNepaliDate"

import TabButton from "../components/TabButton"
import Bratabandha from "./bratabandha-date"
import DailyEvent from "./daily-event"
import Marriage from "./marriage-date"

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
  const [activeTab, setActiveTab] = useState("events")

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
  }, [])

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

  const isHoliday = singleDayData.h

  return (
    <div className="plasmo-w-80 plasmo-bg-red-50 plasmo-rounded-xl plasmo-shadow-lg">
      {/* Header section with dark red background */}
      <div className="plasmo-bg-red-800 plasmo-text-white plasmo-p-4">
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
            {englishMonth.slice(0, 3)} {enDate}, {enYear}
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

      {/* Tabs section */}
      <div className="plasmo-bg-red-50 plasmo-p-4">
        <div className="plasmo-flex plasmo-space-x-2 plasmo-mb-4">
          <TabButton
            setActiveTab={setActiveTab}
            tab="events"
            activeTab={activeTab}
            text="आजका पर्व"
            isHoliday={isHoliday}
          />
          <TabButton
            setActiveTab={setActiveTab}
            tab="bratabandha"
            activeTab={activeTab}
            text="ब्रतबन्ध"
            isHoliday={isHoliday}
          />
          <TabButton
            setActiveTab={setActiveTab}
            tab="marriage"
            activeTab={activeTab}
            text="विवाह"
            isHoliday={isHoliday}
          />
        </div>

        {/* Content section with icon and heading */}
        <div className="plasmo-flex plasmo-items-center plasmo-mb-4">
          <Calendar className="plasmo-h-5 plasmo-w-5 plasmo-text-red-800" />
          <h2 className="plasmo-ml-2 plasmo-text-lg plasmo-font-bold plasmo-text-red-800">
            {activeTab === "events" && "आजका पर्वहरू"}
            {activeTab === "bratabandha" && "ब्रतबन्ध मुहूर्त"}
            {activeTab === "marriage" && "विवाह मुहूर्त"}
          </h2>
        </div>

        {/* Tab content */}
        <div className="plasmo-mt-2">
          {activeTab === "events" && (
            <DailyEvent isHoliday={isHoliday} nepaliDate={nepaliDate} />
          )}
          {activeTab === "bratabandha" && (
            <Bratabandha isHoliday={isHoliday} nepaliDate={nepaliDate} />
          )}
          {activeTab === "marriage" && (
            <Marriage isHoliday={isHoliday} nepaliDate={nepaliDate} />
          )}
        </div>
      </div>
    </div>
  )
}
