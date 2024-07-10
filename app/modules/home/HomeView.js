"use client";

import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { Box, Image } from "gestalt";
import Weather from "../../components/Weather";
import Calendar from "../../components/Calendar";

const HomeView = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const router = useRouter();

  if (isMobile || isTablet)
    return (
      <Box display="flex" height="100vh" position="relative">
        <Box width="100%">
          <Image
            src="https://i.pinimg.com/564x/32/79/ed/3279ed326af863a1dfe31e922713d4af.jpg"
            alt="bg"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Box
          position="absolute"
          bottom
          display="flex"
          justifyContent="center"
          alignItems="end"
          height="100vh"
          width="100%"
        >
          <Box
            paddingY={8}
            paddingX={5}
            justifyContent="between"
            width="100%"
            height="100%"
            display="flex"
          >
            <Weather />
            <Calendar />
          </Box>
        </Box>
      </Box>
    );
};

export default HomeView;
