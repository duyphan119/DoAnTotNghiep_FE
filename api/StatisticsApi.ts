import { privateAxios } from "@/config/configAxios";
import { StatisticsModel } from "@/models";

class StatisticsApi {
  nameApi: string;

  constructor() {
    this.nameApi = "statistics";
  }

  getStatistics(): Promise<StatisticsModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await (privateAxios().get(this.nameApi) as Promise<{
          data: any;
          message: string;
        }>);
        resolve(new StatisticsModel(data));
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default StatisticsApi;
