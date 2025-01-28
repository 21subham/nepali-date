import { Calendar, Clock } from "lucide-react"
import { useEffect, useState } from "react"

import getData from "~lib/getData"
import getNepaliDate from "~lib/getNepaliDate"

interface Event {
  time: string
  title: string
}

interface NepaliDateEventsProps {
  currentDay?: string
}

export default function NepaliDateEvents({
  currentDay = ""
}: NepaliDateEventsProps) {
  const currentNepaliDate = currentDay || " जेठ "

  const { nepday, bsDate, year, month, date, adDate } = getNepaliDate()

  // Example events, replace with actual events for the day
  const events: Event[] = [
    { time: "११:००", title: "टीम मिटिङ" },
    { time: "१४:३०", title: "लन्च ब्रेक" },
    { time: "१६:००", title: "प्रोजेक्ट रिभ्यु" }
  ]
  const [prodtithi, setprodtithi] = useState("")
  const getTithi = async () => {
    console.log("nepali date", getNepaliDate())

    const tithi = await getData("28", "10", "2081")
    console.log("tithi", tithi)
    setprodtithi(tithi)

    //englishdate, nepalimonth, nepaliyear   28, 10, 2081
  }

  getTithi()

  return (
    <div className="plasmo-w-80 plasmo-bg-red-50 plasmo-rounded-xl  plasmo-shadow-lg">
      <div className="plasmo-bg-red-800 plasmo-text-white plasmo-p-4 plasmo-m-2 plasmo-rounded-lg">
        <h1 className="plasmo-text-center plasmo-font-bold plasmo-text-2xl">
          {prodtithi}
        </h1>
        {/* for eng date */}
        <p className="plasmo-text-center plasmo-text-sm">{bsDate[0]}</p>
        {/* for day */}
        <p className="plasmo-text-center plasmo-text-lg plasmo-mt-2">
          {nepday}
        </p>
      </div>
      <div className="plasmo-p-4">
        <div className="plasmo-flex plasmo-items-center plasmo-mb-4">
          <Calendar className="plasmo-mr-2 plasmo-h-5 plasmo-w-5 plasmo-text-red-800" />
          <h2 className="plasmo-text-lg plasmo-font-semibold">
            आजको कार्यक्रमहरू
          </h2>
        </div>
        {events.length > 0 ? (
          <ul className="plasmo-space-y-3">
            {events.map((event, index) => (
              <li key={index} className="plasmo-flex plasmo-items-start">
                <Clock className="plasmo-mr-2 plasmo-h-4 plasmo-w-4 plasmo-mt-1 plasmo-text-red-800" />
                <div>
                  <span className="plasmo-font-semibold">{event.time}</span>
                  <span className="plasmo-mx-2">-</span>
                  <span>{event.title}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="plasmo-text-center plasmo-text-gray-500 plasmo-italic">
            कुनै कार्यक्रम छैन
          </p>
        )}
      </div>
    </div>
  )
}
