function formatISODate(isoDateString: string) {
  const year = Number(isoDateString.slice(0, 2));
  const month = Number(isoDateString.slice(3, 5));
  const day = Number(isoDateString.slice(6, 8));

  return { year, month, day };
}

export default formatISODate;
