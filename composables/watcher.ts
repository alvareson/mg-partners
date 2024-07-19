import { getScrollbarWidth } from "@/utils/get-scrollbar-width"

export const useWatcher = (open: Ref<boolean>) => {
  watch(open, value => {
    const html = document.documentElement
    if (value) {
      html.classList.add("overflow")
      if (html.scrollHeight > html.clientHeight) html.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`)
    } else {
      html.classList.remove("overflow")
      html.style.setProperty("--scrollbar-width", "")
    }
  })
}
