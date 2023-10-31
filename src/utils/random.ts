export const randomItem = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const randomItem = arr[randomIndex]
  return randomItem
}
