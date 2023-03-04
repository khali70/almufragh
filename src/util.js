export function FormatImg(str) {
  return str;
}

export function getFormattedDate(date) {
  let today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

export function secondsToHHMMSS(seconds) {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
}
