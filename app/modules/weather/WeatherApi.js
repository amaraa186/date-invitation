import { weatherRequest } from "../../../utils/api";

export async function fetchWeather() {
  return await weatherRequest().get();
}
