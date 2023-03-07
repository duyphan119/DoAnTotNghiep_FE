import { privateAxios } from "../config/configAxios";
import { OrderDiscountModel } from "../models";
import { MSG_SUCCESS } from "../utils/constants";

class OrderDiscountApi {
  nameApi: string;
  constructor() {
    this.nameApi = "order-discount";
  }

  check({
    code,
    total,
  }: {
    code: string;
    total: number;
  }): Promise<OrderDiscountModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, message } = await (privateAxios().get(
          `${this.nameApi}/check`,
          {
            params: { code, total },
          }
        ) as Promise<{
          data: any;
          message: string;
        }>);

        resolve(
          message === MSG_SUCCESS
            ? new OrderDiscountModel(data)
            : new OrderDiscountModel()
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

export default OrderDiscountApi;
