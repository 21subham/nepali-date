import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import getNepaliDate from "~lib/getNepaliDate"

interface NepaliDate {
  nepday: string
  bsDate: string[]
  adDate: string
  monthcalc: string
  tithi: string | null
  fest: string | null
}

export default function NepaliDateFestivals() {
  const [nepaliDate, setNepaliDate] = useState<NepaliDate | null>(null)

  useEffect(() => {
    const fetchNepaliDate = async () => {
      try {
        const dateData = await getNepaliDate()
        if (dateData) {
          setNepaliDate(dateData)

          console.log(dateData.month + 1)
          console.log(setNepaliDate(dateData + 1))
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

  const { nepday, bsDate, adDate, monthcalc, tithi, fest } = nepaliDate

  return (
    <div className="plasmo-w-80 plasmo-bg-red-50 plasmo-rounded-xl plasmo-shadow-lg">
      <div className="plasmo-bg-red-800 plasmo-text-white plasmo-p-4 plasmo-my-1 plasmo-m-2 plasmo-rounded-lg">
        <h1 className="plasmo-text-center plasmo-font-bold plasmo-text-2xl">
          {monthcalc} {bsDate[2]}, {bsDate[0]}
        </h1>
        <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
          {/* <button
            className="plasmo-w-8 plasmo-h-8 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full plasmo-hover:bg-white/20 plasmo-transition-colors"
            aria-label="Previous">
            <ChevronLeft className="plasmo-h-4 plasmo-w-4" />
          </button> */}
          <p className="plasmo-text-center plasmo-text-sm">{adDate}</p>
          {/* <button
            className="plasmo-w-8 plasmo-h-8 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full plasmo-hover:bg-white/20 plasmo-transition-colors"
            aria-label="Next">
            <ChevronRight className="plasmo-h-4 plasmo-w-4" />
          </button> */}
        </div>
        <p className="plasmo-text-center plasmo-text-lg plasmo-mt-2">
          {nepday}, {tithi || "Tithi Not Available"}
        </p>
      </div>
      <div className="plasmo-p-4 plasmo-m-0">
        <div className="plasmo-flex plasmo-items-center plasmo-mb-4">
          <Calendar className="plasmo-mr-2 plasmo-h-5 plasmo-w-5 plasmo-text-red-800" />
          <h2 className="plasmo-text-lg plasmo-font-semibold">आजका पर्वहरू</h2>
        </div>
        {fest ? (
          <ul className="plasmo-space-y-3 plasmo-text-sm ">
            {fest.split(", ").map((festival, index) => (
              <li key={index} className="plasmo-flex plasmo-items-start">
                <span className="plasmo-font-semibold plasmo-text-red-800">
                  •
                </span>
                <span className="plasmo-ml-2">{festival}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="plasmo-text-center plasmo-text-gray-500 plasmo-italic">
            कुनै पर्व छैन
          </p>
        )}
      </div>
    </div>
  )
}
