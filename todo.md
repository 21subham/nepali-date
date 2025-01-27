import { Calendar, Clock } from "lucide-react"

interface Event {
time: string
title: string
}

export default function NepaliDateEvents() {
// Note: You'll need to implement the logic for date conversion and fetching events
const currentNepaliDate = "२०८० जेठ १५" // Example date, replace with actual Nepali date
const currentGregorianDate = "May 29, 2023" // Example date, replace with actual Gregorian date
const dayOfWeek = "सोमबार" // Example day, replace with actual day of week in Nepali

// Example events, replace with actual events for the day
const events: Event[] = [
{ time: "११:००", title: "टीम मिटिङ" },
{ time: "१४:३०", title: "लन्च ब्रेक" },
{ time: "१६:००", title: "प्रोजेक्ट रिभ्यु" }
]

return (

<div className="font-sans">
<div className="w-80 bg-red-50 rounded-xl overflow-hidden shadow-lg">
<div className="bg-red-800 text-white p-4">
<h1 className="text-center font-bold text-2xl">
{currentNepaliDate}
</h1>
<p className="text-center text-sm">{currentGregorianDate}</p>
<p className="text-center text-lg mt-2">{dayOfWeek}</p>
</div>
<div className="p-4">
<div className="flex items-center mb-4">
<Calendar className="mr-2 h-5 w-5 text-red-800" />
<h2 className="text-lg font-semibold">आजको कार्यक्रमहरू</h2>
</div>
{events.length > 0 ? (
<ul className="space-y-3">
{events.map((event, index) => (
<li key={index} className="flex items-start">
<Clock className="mr-2 h-4 w-4 mt-1 text-red-800" />
<div>
<span className="font-semibold">{event.time}</span>
<span className="mx-2">-</span>
<span>{event.title}</span>
</div>
</li>
))}
</ul>
) : (
<p className="text-center text-gray-500 italic">
कुनै कार्यक्रम छैन
</p>
)}
</div>
</div>
</div>
)
}

//my popup
import { useState } from "react"

import { CountButton } from "~features/count-button"

import "~style.css"

function IndexPopup() {
const [day, setDay] = useState("")
const getData = async () => {
const data = await import("./data/2081/1.json", {
assert: { type: "json" }
})
console.log(data.days.find((day) => day.e === "01"))
// Access the JSON content
const days = data.days.find((day) => day.e === "01")
setDay(days.t)
}
getData()
return (

<div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40 plasmo-text-blue-600">
<CountButton />
<p>Lauda {day}</p>
</div>
)
}

export default IndexPopup
