// Transformando a data yyyy-mm-dd para dd/mm/yyyy
// eslint-disable-next-line consistent-return
const parseDateStringToBrFormat = (dateString?: string): string | void => {
  if(dateString) {
    const parsedDate = dateString.split('-').reverse().join('/');

    return parsedDate;
  }
}

export default parseDateStringToBrFormat;
