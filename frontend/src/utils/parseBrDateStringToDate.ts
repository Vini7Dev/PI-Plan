// Transformando a data dd/mm/yyy para uma data
const parseBrDateStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-');

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);
  return new Date(yearNumber, monthNumber - 1, dayNumber);
}

export default parseBrDateStringToDate;
