import { DateJson } from "@/types/json";

class DateModel {
  createdAt: string;
  updatedAt: string;
  constructor(obj?: Partial<DateJson> | null) {
    this.createdAt = obj?.createdAt ?? new Date().toISOString();
    this.updatedAt = obj?.updatedAt ?? new Date().toISOString();
  }
}

export default DateModel;
