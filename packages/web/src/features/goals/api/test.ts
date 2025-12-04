
export async function getListGoals() {
  const response = await fetch("/api/")
  const data = await response.text()
  console.log(data)
}
