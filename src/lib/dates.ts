export function getTimeAgo(timestamp: number) {
  const diff = new Date().getTime() - timestamp
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? `${diffDays}d` : diffHours > 0 ? `${diffHours}h` : `${diffMinutes}m`
}
