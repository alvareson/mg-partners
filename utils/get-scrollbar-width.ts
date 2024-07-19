export const getScrollbarWidth = () => {
  const scrollDiv = document.createElement("div")
  scrollDiv.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"
  document.body.appendChild(scrollDiv)
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollBarWidth
}
