import dynamic from "next/dynamic";

const HomeViewContainer = dynamic(() => import("../app/modules/Landing"), {
  ssr: false,
});

function LandingPage() {
  return <HomeViewContainer />;
}

export default LandingPage;
