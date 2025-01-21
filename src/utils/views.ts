export function formatViews(views: number): string {
  // NOTE: This is a temporary fix to show more views
  views *= Math.round(7.5)

  if (views < 1000) {
    return views.toString()
  } else if (views < 1000000) {
    const formatted = views / 1000
    return formatted % 1 === 0
      ? `${formatted.toFixed(0)}k`
      : `${formatted.toFixed(1)}k`
  } else if (views < 1000000000) {
    const formatted = views / 1000000
    return formatted % 1 === 0
      ? `${formatted.toFixed(0)}M`
      : `${formatted.toFixed(1)}M`
  } else {
    const formatted = views / 1000000000
    return formatted % 1 === 0
      ? `${formatted.toFixed(0)}B`
      : `${formatted.toFixed(1)}B`
  }
}
