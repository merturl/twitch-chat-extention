function checkTime(i: number) {
  return i < 10 ? '0' + i : i;
}

export function getTimeStamp(value?: string) {
  if (!value) return ``;
  const timeStamp = new Date(parseInt(value, 10));
  const h = checkTime(timeStamp.getHours());
  const m = checkTime(timeStamp.getMinutes());
  return `${h}:${m}`;
}
