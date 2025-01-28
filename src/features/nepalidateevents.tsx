import { Calendar, Clock } from "lucide-react"
import { useEffect, useState } from "react"

import getData from "~lib/getData"
import getNepaliDate from "~lib/getNepaliDate"

interface Event {
  time: string
  title: string
}

export default function NepaliDateEvents() {
  const [nepaliDate, setNepaliDate] = useState<{
    nepday: string
    bsDate: string[]
    adDate: string
    monthcalc: string
    tithi: string | null
  } | null>(null)

  const [convertedMonth, setConvertedMonth] = useState("")
  const [tithi, setTithi] = useState("")

  const events: Event[] = [
    { time: "११:००", title: "टीम मिटिङ" },
    { time: "१४:३०", title: "लन्च ब्रेक" },
    { time: "१६:००", title: "प्रोजेक्ट रिभ्यु" }
  ]

  useEffect(() => {
    const fetchNepaliDate = async () => {
      try {
        const dateData = await getNepaliDate()
        if (dateData) {
          setNepaliDate(dateData)
          setConvertedMonth(dateData.monthcalc)
          setTithi(dateData.tithi || "")
        }
      } catch (error) {
        console.error("Error fetching Nepali date:", error)
      }
    }

    fetchNepaliDate()
  }, [])

  if (!nepaliDate) {
    return <div>Loading...</div>
  }

  return (
    <div className="plasmo-w-80 plasmo-bg-red-50 plasmo-rounded-xl plasmo-shadow-lg">
      <div className="plasmo-bg-red-800 plasmo-text-white plasmo-p-4 plasmo-m-2 plasmo-rounded-lg">
        <h1 className="plasmo-text-center plasmo-font-bold plasmo-text-2xl">
          {convertedMonth} {nepaliDate.bsDate[2]}, {nepaliDate.bsDate[0]}
        </h1>
        <p className="plasmo-text-center plasmo-text-sm">{nepaliDate.adDate}</p>
        <p className="plasmo-text-center plasmo-text-lg plasmo-mt-2">
          {nepaliDate.nepday}, {tithi}
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
