class DateModel {
  createdAt: string;
  updatedAt: string;
  constructor(obj?: any) {
    this.createdAt = obj?.createdAt ?? new Date().toISOString();
    this.updatedAt = obj?.updatedAt ?? new Date().toISOString();
  }
}

export default DateModel;
