// Transformando a data yyyy-mm-dd para dd/mm/yyyy
// eslint-disable-next-line consistent-return
const parseDateStringToBrFormat = (dateString?: string): string | null => {
  if(dateString) {
    const parsedDate = dateString.split('-').reverse().join('/');

    return parsedDate;
  }

  return null;
}

export default parseDateStringToBrFormat;
