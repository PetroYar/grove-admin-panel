export function formatDate(base) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(base.createDate)
    .replace(" р.", " року");
}
