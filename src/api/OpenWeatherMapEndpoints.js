import { CustomAxios } from "./axios";

export const getFiveDaysForecast = async (lat, lon) => {
  return await CustomAxios.get("forecast?lat=" + lat + "&lon=" + lon);
};
