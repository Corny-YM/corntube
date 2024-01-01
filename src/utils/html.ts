import { formatTimeToNumber } from '.'

export const htmlRender = (des: string) => {
  let str = des
  // Reset string
  str = str.replace(/<(a)[^>]*>/g, '')
  str = str.replace(/\n/g, '<br />')

  // Format link
  const linkRegex =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g

  str = str.replace(
    linkRegex,
    (link) =>
      `<a class="text-blueAntd font-semibold" style="text-decoration: none" href="${link}" target="_blank" ref="noopener">${link}</a>`
  )

  return str
}

export const stringToSubtitles = (value: string) => {
  // Use a regular expression to match <p> tags
  const regex = /<p[^>]*>.*?<\/p>/g
  const matches = value.match(regex)

  // Log the extracted <p> tags
  return matches
}
export const stringSubToTime = (value: string) => {
  // Regular expressions to match begin, end, and text content
  const beginRegex = /begin="([^"]+)"/
  const endRegex = /end="([^"]+)"/
  const textRegex = /<p[^>]*>([\s\S]*?)<\/p>/

  // Extract values using regular expressions
  const beginMatch = value.match(beginRegex)
  const endMatch = value.match(endRegex)
  const textMatch = value.match(textRegex)

  // Check if matches exist and extract values
  const begin = beginMatch ? beginMatch[1] : null
  const end = endMatch ? endMatch[1] : null
  const textContent = textMatch ? textMatch[1].trim() : null
  return {
    begin: formatTimeToNumber(begin!),
    end: formatTimeToNumber(end!),
    text: textContent,
  }
}
export const stringToElement = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  return doc.body.firstChild
}
