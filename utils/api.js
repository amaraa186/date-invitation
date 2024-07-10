import axios from "axios";

const TIMEOUT = 20000;

export function weatherRequest() {
  let query = {
    baseURL:
      "https://api.weatherapi.com/v1/current.json?key=3ad40bf8acfd4609881150536240607&q=Ulaanbaatar&aqi=no",
    timeout: TIMEOUT,
  };

  return axios.create(query);
}
