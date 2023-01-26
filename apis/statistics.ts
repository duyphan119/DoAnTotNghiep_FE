import { privateAxios } from "../config/configAxios";

export const getStatistics = (): Promise<any> =>
  privateAxios().get("statistics");
