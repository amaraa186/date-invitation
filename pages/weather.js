import dynamic from "next/dynamic";
import { withRouter } from "next/router";

const Weather = dynamic(() => import("app/modules/weather/WeatherView"), {
  ssr: false,
});

function WeatherPage() {
  return <Weather />;
}

export default withRouter(WeatherPage);
