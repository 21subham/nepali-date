export default async function getData(
  nepDate: string,
  nepMonth: string,
  nepYear: string
) {
  try {
    const url = `https://21subham.github.io/Extension-date-data/${nepYear}/${nepMonth}.json`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()

    const day = data.days.find((day: { e: string }) => day.e === nepDate)

    if (day) {
      const bratabandhaData = data.bratabandha[0]
      const marriageData = data.marriage[0]

      return { singleDayData: day, bratabandhaData, marriageData }
    } else {
      console.error(`Date ${nepDate} not found in the data.`)
      return null
    }
  } catch (error) {
    console.error(`Error fetching data for ${nepMonth}/${nepYear}:`, error)
    return null
  }
}
