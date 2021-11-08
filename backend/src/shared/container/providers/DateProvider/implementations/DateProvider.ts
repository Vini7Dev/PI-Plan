import IDateProvider from '../models/IDateProvider';

class DateProvider implements IDateProvider {
  // Transformando datas no formato 'DD-MM-AAAA'
  public parseStringDate(stringDate: string): Date {
    // Dividindo o texto pela '-'
    const [stringDay, stringMonth, stringYear] = stringDate.split('/');

    // Transformando em número
    const day = Number(stringDay);
    const month = Number(stringMonth);
    const year = Number(stringYear);

    // Gerando e retornando a data
    const date = new Date(year, month - 1, day);

    return date;
  }

  // Verificando se uma data é anterior a outra
  public isBefore(startDate: Date, endDate: Date): boolean {
    return startDate <= endDate;
  }
}

export default DateProvider;
