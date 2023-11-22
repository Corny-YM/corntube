export const formatViews = (viewCount: number, fixed: number = 1) => {
  let result = ''
  if (viewCount <= 0) return 0
  if (viewCount < 1000) {
    result = viewCount.toString()
  } else if (viewCount < 1000000) {
    result = (viewCount / 1000).toFixed(fixed) + ' N'
  } else if (viewCount < 1000000000) {
    result = (viewCount / 1000000).toFixed(fixed) + ' Tr'
  } else {
    result = (viewCount / 1000000000).toFixed(fixed) + ' T'
  }
  return result.replace('.', ',')
}

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = Math.floor(duration % 60)

  const HH = hours.toString().padStart(2, '0')
  const MM = minutes.toString().padStart(2, '0')
  const SS = seconds.toString().padStart(2, '0')

  if (HH === '00') return `${MM}:${SS}`
  return `${HH}:${MM}:${SS}`
}

export const formatTimeAgoToVietnamese = (text: string) => {
  const timeUnits: Record<string, string> = {
    year: 'năm',
    month: 'tháng',
    week: 'tuần',
    day: 'ngày',
    hour: 'giờ',
    minute: 'phút',
    second: 'giây',
  }
  const regex = /(\d+)\s*(year|month|week|day|hour|minute|second)s?/g
  const time = text
    ?.replace(regex, (match, value, unit) => {
      return `${value} ${timeUnits[unit]} trước`
    })
    .replace('ago', '')
    .replace('edited', 'đã chỉnh sửa')
    .replace('Streamed', 'Phát trực tiếp')
    .trim()
  return time
}

export function formatDate(date: Date, format: string) {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const fullYear =
    date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear()
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const resultHour = format.replace('hh', hour.toString())
  const resultMinute = resultHour.replace('mm', minutes.toString())
  const resultSecond = resultMinute.replace('ss', seconds.toString())
  const resultYear = resultSecond.replace('YYYY', fullYear.toString())
  const resultMonth = resultYear.replace('MM', month.toString())
  const result = resultMonth.replace('DD', day.toString())
  return result
}
