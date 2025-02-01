import { Heart } from "lucide-react"

import type { INepaliDate } from "./nepalidateevents"

interface IMarriageProps {
  isHoliday: boolean
  nepaliDate: INepaliDate
}
export default function Marriage({ isHoliday, nepaliDate }: IMarriageProps) {
  return (
    <>
      <div
        className={`flex items-center my-2 ${isHoliday ? "text-red-800" : "text-emerald-700"}`}></div>
      {nepaliDate.marriageData ? (
        <ul className="px-3 text-sm space-y-3">
          <li className="flex items-start">
            <span
              className={`font-semibold ${isHoliday ? "text-red-800" : "text-emerald-700"}`}>
              •
            </span>
            <span className="ml-2">{nepaliDate.marriageData}</span>
          </li>
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic font-sans">
          {" "}
          आज कुनै पर्वहरूछैन
        </p>
      )}
    </>
  )
}
