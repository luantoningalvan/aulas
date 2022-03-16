export default function formatDate(dateInMiliseconds) {
  var date = new Date(dateInMiliseconds);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hour = date.getHours();
  var minute = date.getMinutes();

  return `${day}/${month}/${year} às ${hour}:${minute}`;
}
