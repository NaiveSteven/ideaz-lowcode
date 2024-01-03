export const formatTime = function (
  time: Date | string | undefined | number,
  type: 'ymd' | 'ymd hms' | 'hms'
) {
  let date;
  if (time) {
    if (typeof time === 'string') {
      date = new Date(Date.parse(time));
    } else {
      date = new Date(time);
    }
  } else {
    date = new Date();
  }

  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (type === 'ymd hms') {
    return Y + M + D + ' ' + h + m + s;
  } else if (type === 'ymd') {
    return Y + M + D;
  }
  return h + m + s;
};
