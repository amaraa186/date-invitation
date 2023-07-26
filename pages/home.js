import dynamic from "next/dynamic";
import { withRouter } from "next/router";

const Home = dynamic(() => import("app/modules/home/HomeView"), {
  ssr: false,
});

function HomePage() {
  return <Home />;
}

export default withRouter(HomePage);
