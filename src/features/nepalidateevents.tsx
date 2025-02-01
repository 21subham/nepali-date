import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import type React from "react"

import getNepaliDate from "~lib/getNepaliDate"

import Bratabandha from "./bratabandha-date"
import DailyEvent from "./daily-event"
import Marriage from "./marrige-date"

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

interface TabButtonProps {
  setActiveTab: (tab: string) => void
  tab: string
  activeTab: string
  text: string
  isHoliday: boolean
}

const TabButton: React.FC<TabButtonProps> = ({
  setActiveTab,
  tab,
  activeTab,
  text,
  isHoliday
}) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-colors
      ${
        activeTab === tab
          ? isHoliday
            ? "plasmo-bg-red-500 plasmo-text-white"
            : "plasmo-bg-green-500 plasmo-text-white"
          : isHoliday
            ? "plasmo-bg-red-100 plasmo-text-red-700 hover:plasmo-bg-red-200"
            : "plasmo-bg-green-100 plasmo-text-green-700 hover:plasmo-bg-green-200"
      }`}>
    {text}
  </button>
)

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

      {/* bottom half */}
      <div
        className={`plasmo-p-4 ${isHoliday ? "" : "plasmo-bg-gradient-to-b plasmo-from-emerald-50 plasmo-to-green-100"}`}>
        {/* tabs selector button */}
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

        {/* display active tags */}
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
  )
}
