import { useEffect, useState } from "react"

import { CountButton } from "~features/count-button"
import NepaliDateEvents from "~features/nepalidateevents"

import "~style.css"

function IndexPopup() {
  const [day, setDay] = useState("")

  const getData = async () => {
    const data = await import("./data/2081/1.json", {
      assert: { type: "json" }
    })

    const days = data.days.find((day) => day.e === "01")
    setDay(days.t)
  }

  // Use useEffect to prevent infinite loop
  useEffect(() => {
    getData()
  }, [getData]) // Added getData to dependencies

  return (
    <div className="plasmo-rounded-xl">
      <NepaliDateEvents currentDay={day} />
    </div>
  )
}

export default IndexPopup
