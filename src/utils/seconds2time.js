/**
 * @format
 * @flow
 */
export default totalSeconds => {
  let hours = Math.floor(totalSeconds / 3600),
    minutes = Math.floor((totalSeconds - hours * 3600) / 60),
    seconds = totalSeconds - hours * 3600 - minutes * 60,
    time = '';

  if (hours != 0) {
    time = hours + ':';
  }

  if (minutes != 0 || time !== '') {
    minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
    time += minutes + ':';
  }

  if (time === '') {
    time = seconds;
  } else {
    time += seconds < 10 ? '0' + seconds : String(seconds);
  }

  return time;
};
