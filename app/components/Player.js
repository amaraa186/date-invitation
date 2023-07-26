import { Box, Flex, Mask, Image, TapArea } from "gestalt";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Player = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });
  const [music, setMusic] = useState({
    src: "https://res.cloudinary.com/urlan/video/upload/v1690352242/airdrop/test_vpntce.mp3",
    name: "Make You Mine",
    minute: 3,
    second: 29,
  });
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // if (isFirst) return;

    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", onNext);

    return () => {
      audioElement.removeEventListener("ended", onNext);
    };
  }, [currentTime]);

  const audioRef = useRef(null);

  useEffect(() => {
    let interval;

    if (playing) {
      interval = setInterval(() => {
        setProgress((prevCounter) => prevCounter + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  const playAudio = () => {
    const audioElement = audioRef.current;
    audioElement.src = music.src;
    audioElement.currentTime = currentTime;
    audioElement.play();
    setPlaying(true);
  };

  const pauseAudio = () => {
    const audioElement = audioRef.current;
    audioElement.pause();
    setCurrentTime(audioElement.currentTime);
    setPlaying(false);
  };

  const onNext = () => {
    setCurrentTime(0);
    setProgress(0);
    playAudio();
  };

  return (
    <Box display="flex" alignItems="center" direction="column">
      <Box position="relative">
        <Mask width={isMobile ? 321 : 600}>
          <Image
            alt="player"
            src="https://res.cloudinary.com/urlan/image/upload/v1690286557/player_ifudzc.png"
            naturalHeight={1}
            naturalWidth={2}
          />
        </Mask>
        <Box
          position="absolute"
          top
          width="100%"
          height="100%"
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <p
            className={styles.player}
            style={{ fontSize: !isMobile ? 35 : 26 }}
          >
            {music.name}
          </p>
          <Box height={isMobile ? 15 : 30} />
          <Box
            width={isMobile ? 220 : 380}
            height={isMobile ? 5 : 10}
            color="tertiary"
            rounding={8}
          >
            <div
              style={{
                height: isMobile ? "5px" : "10px",
                backgroundColor: "#FF8F8F",
                borderRadius: "20px",
                width: isMobile
                  ? (220 / (music.minute * 60 + music.second)) * (progress + 1)
                  : (380 / (music.minute * 60 + music.second)) * (progress + 1),
              }}
            />
          </Box>
          <Box height={isMobile ? 15 : 30} />

          <Flex gap={isMobile ? 4 : 6} alignItems="center">
            <TapArea onTap={onNext}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Box width={isMobile ? 25 : 37}>
                  <Image
                    src="https://res.cloudinary.com/urlan/image/upload/v1690293820/Polygon_2_mfbubh.svg"
                    alt="pre"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Box>
              </motion.div>
            </TapArea>
            <TapArea onTap={!playing ? playAudio : pauseAudio}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Box width={isMobile ? 38 : 55}>
                  <Image
                    src={
                      playing
                        ? "https://res.cloudinary.com/urlan/image/upload/v1690293818/Group_22_swgfgm.svg"
                        : "https://res.cloudinary.com/urlan/image/upload/v1690293817/Group_22_1_m1chr7.svg"
                    }
                    alt="play"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Box>
              </motion.div>
            </TapArea>
            <TapArea onTap={onNext}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Box width={isMobile ? 25 : 37}>
                  <Image
                    src="https://res.cloudinary.com/urlan/image/upload/v1690293744/Polygon_3_mkou2o.svg"
                    alt="af"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Box>
              </motion.div>
            </TapArea>
          </Flex>
          <audio ref={audioRef} src="" />
        </Box>
      </Box>
      <p className={styles.text}>Music Player</p>
    </Box>
  );
};

export default Player;
