import { weatherRequest } from "./api";

export async function fetchWeather() {
  return await weatherRequest().get();
}
