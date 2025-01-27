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
