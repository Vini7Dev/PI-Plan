interface IDateProvider {
  parseStringDate(stringDate: string): Date;
  isBefore(startDate: Date, endDate: Date): boolean;
}

export default IDateProvider;
