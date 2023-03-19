import { VariantValueModel } from "../models";

class Helper {
  formatVariants(variantValues: VariantValueModel[]): {
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  } {
    let result: {
      [key: string]: VariantValueModel[];
    } = {};
    variantValues.forEach((variantValue: VariantValueModel) => {
      const variant = variantValue.variant;
      if (variant) {
        const { name } = variant;
        if (result[name]) {
          result[name].push(variantValue);
        } else {
          result[name] = [variantValue];
        }
      }
    });
    return {
      keys: Object.keys(result),
      values: result,
    };
  }
  formatYAxisPrice(value: number) {
    return value === 0
      ? "0"
      : value >= 1000000
      ? `${(value / 1000000).toFixed(1)}tr`
      : `${value / 1000}k`;
  }
  formatDate(input: string | number | Date) {
    const d = new Date(input);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    return `${date < 10 ? "0" + date : date}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  }
  formatTime(input: string | number | Date) {
    const d = new Date(input);
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${second < 10 ? "0" + second : second}`;
  }
  formatDateTime(input: string | number | Date | null) {
    if (!input) return "";
    return `${this.formatDate(input)} ${this.formatTime(input)}`;
  }

  getAvatarName(fullName: string) {
    const splitFullName = fullName.split(" ");
    const lastItem = splitFullName[splitFullName.length - 1];
    return lastItem.charAt(0);
  }

  getPathFromSearchParams(pathName: string, params: any) {
    const queryString =
      (Object.keys(params).length > 0 ? "?" : "") +
      new URLSearchParams(params).toString();
    return pathName + queryString;
  }
}

const helper = new Helper();

export default helper;
