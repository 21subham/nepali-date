import { Clock } from "lucide-react"

import type { INepaliDate } from "./nepalidateevents"

interface IBratabandhaProps {
  isHoliday: boolean
  nepaliDate: INepaliDate
}
export default function Bratabandha({
  isHoliday,
  nepaliDate
}: IBratabandhaProps) {
  return (
    <>
      <div
        className={`flex items-center my-2 ${isHoliday ? "text-red-800" : "text-emerald-700"}`}>
        <Clock className="mr-2 h-5 w-5 " />
        <h2 className="text-lg font-semibold font-sans">ब्रतबन्ध मुर्हुतहरू</h2>
      </div>
      {nepaliDate.bratabandhaData ? (
        <ul className="px-3 text-sm space-y-3">
          <li className="flex items-start">
            <span
              className={`font-semibold ${isHoliday ? "text-red-800" : "text-emerald-700"}`}>
              •
            </span>
            <span className="ml-2">{nepaliDate.bratabandhaData}</span>
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
