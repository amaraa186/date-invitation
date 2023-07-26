import { useState } from "react";
import { Box, Flex, Mask, Image, TapArea } from "gestalt";
import styles from "../../page.module.css";
import { useMediaQuery } from "react-responsive";
import Player from "../../components/Player";
import ReadyButton from "../../components/ReadyButton";
import { motion } from "framer-motion";
import WeatherModal from "../../components/WeatherModal";
import NewsModal from "../../components/NewsModal";
import FinalModal from "../../components/FinalModal";

const HomeView = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const [showWeather, setShowWeather] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [checkWeather, setCheckWeather] = useState(false);
  const [checkNews, setCheckNews] = useState(false);

  const onShowWeather = () => {
    setShowWeather(!showWeather);

    if (showWeather) setCheckWeather(true);
  };

  const onShowNews = () => {
    setShowNews(!showNews);

    if (showNews) setCheckNews(true);
  };

  const onClick = () => {
    setShowFinal(!showFinal);
  };

  if (isMobile || isTablet)
    return (
      <Box position="relative">
        <Box height="100vh">
          <Image
            alt="cover"
            src={
              isMobile
                ? "https://res.cloudinary.com/urlan/image/upload/v1690277250/Group_27_xeugcs.svg"
                : "https://res.cloudinary.com/urlan/image/upload/v1690282988/Group_28_fwderw.png"
            }
            naturalHeight={1}
            naturalWidth={1}
            fit="cover"
          />
        </Box>
        <Box
          height="100vh"
          position="absolute"
          width="100%"
          top
          display="flex"
          direction="column"
        >
          <Box height={76} />
          <Flex justifyContent="around" alignItems="center" gap={2}>
            <TapArea onTap={onShowWeather}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Mask
                  width={isMobile ? 141 : 200}
                  height={isMobile ? 180 : 260}
                >
                  <Image
                    alt="weather"
                    src="https://res.cloudinary.com/urlan/image/upload/v1690286557/weather_equlwn.png"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Mask>
              </motion.div>
              <p className={styles.text}>Weather</p>
            </TapArea>

            <TapArea onTap={onShowNews}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Mask
                  width={isMobile ? 141 : 200}
                  height={isMobile ? 180 : 260}
                >
                  <Image
                    alt="news"
                    src="https://res.cloudinary.com/urlan/image/upload/v1690286557/news_wwwjmr.png"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Mask>
              </motion.div>
              <p className={styles.text}>Daily News</p>
            </TapArea>
          </Flex>

          <Box height={20} />

          <Player />

          {checkNews && checkWeather && <ReadyButton onClick={onClick} />}
        </Box>
        {showWeather && <WeatherModal onShowWeather={onShowWeather} />}
        {showNews && <NewsModal onShowNews={onShowNews} />}
        {showFinal && <FinalModal onClick={onClick} />}
      </Box>
    );
};

export default HomeView;
