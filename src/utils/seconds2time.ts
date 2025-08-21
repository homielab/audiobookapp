export default function seconds2time(totalSeconds: number | null) {
  if (!totalSeconds) return ''

  let hours = Math.floor(totalSeconds / 3600),
    minutes = Math.floor((totalSeconds - hours * 3600) / 60),
    seconds = Math.floor(totalSeconds - hours * 3600 - minutes * 60),
    time = ''

  if (hours !== 0) {
    time = hours + ':'
  }

  if (minutes !== 0 || time !== '') {
    let minutesString =
      minutes < 10 && time !== '' ? '0' + minutes : String(minutes)
    time += minutesString + ':'
  }

  if (time === '') {
    time = seconds.toString()
  } else {
    time += seconds < 10 ? '0' + seconds : String(seconds)
  }

  return time
}
