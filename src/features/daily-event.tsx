import { Calendar } from "lucide-react"
import React from "react"

import type { INepaliDate } from "./nepalidateevents"

interface INepaliDateProps {
  isHoliday: boolean
  nepaliDate: INepaliDate
}
export default function DailyEvent({
  isHoliday,
  nepaliDate
}: INepaliDateProps) {
  return (
    <>
      <div
        className={`flex items-center mb-2 ${isHoliday ? "text-red-800" : "text-emerald-700"}`}></div>
      {nepaliDate.singleDayData.f ? (
        <ul className="px-3 space-y-3 text-sm">
          {nepaliDate.singleDayData.f.split(", ").map((festival, index) => (
            <li key={index} className="flex items-start">
              <span
                className={`font-semibold ${isHoliday ? "text-red-800" : "text-emerald-700"}`}>
                •
              </span>
              <span className="ml-2">{festival}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className=" px-3 space-y-3 text-md">
          {" "}
          <span
            className={`font-semibold ${isHoliday ? "text-red-800" : "text-emerald-700"}`}>
            •
          </span>{" "}
          आज कुनै पर्वहरू छैन
        </p>
      )}
    </>
  )
}
