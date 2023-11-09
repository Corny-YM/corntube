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
      `<a class="text-blueAntd" style="text-decoration: none" href="${link}" target="_blank" ref="noopener">${link}</a>`
  )

  return str
}
