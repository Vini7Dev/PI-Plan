// Transformando a data yyyy-mm-dd para dd/mm/yyyy
const parseDateStringToBrFormat = (dateString: string): string => {
  const parsedDate = dateString.split('-').reverse().join('/');

  return parsedDate;
}

export default parseDateStringToBrFormat;
