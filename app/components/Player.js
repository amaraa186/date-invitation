import { Box, Flex, Mask, Image, TapArea } from "gestalt";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const musics = [
  {
    src: "https://res.cloudinary.com/urlan/video/upload/v1690352242/airdrop/test_vpntce.mp3",
    name: "Make You Mine",
    minute: 3,
    second: 29,
  },
  {
    src: "https://res.cloudinary.com/urlan/video/upload/v1690389865/TigerFish_osecck.mp3",
    name: "Ungut Yrtunts",
    minute: 2,
    second: 24,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1oTgjE-wnJ49RSMoptyw3pu2dV0SCK_NG",
    name: "Happy Birthday",
    minute: 0,
    second: 46,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=11sXVlP4uHoFamjympy3L5CVRmkLIrKI4",
    name: "Howl's Moving Castle",
    minute: 5,
    second: 8,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1oLqlsRZ4Hwu5fXxg9UhUBCp9IqFc7kco",
    name: "Kiki's Delivery Service",
    minute: 3,
    second: 56,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1NoIangU_3BJdzWy2DkhgJl3hm6uXuGtb",
    name: "Ponyo",
    minute: 2,
    second: 42,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1sKI1CdU5xQOCdzTeZbuKXva-ehMnM9Kd",
    name: "Spirited Away",
    minute: 3,
    second: 38,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1SdmySYddq2NBfsLVEyXMPtwhCrgX8hgo",
    name: "Spirited Away",
    minute: 5,
    second: 39,
  },
  {
    src: "https://docs.google.com/uc?export=download&id=1xud9pDs85Z-LxLbRx442WBGoLJe5OqCY",
    name: "Tonari no Totoro",
    minute: 3,
    second: 41,
  },
];

const Player = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [music, setMusic] = useState(musics[0]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isFirst, setisFirst] = useState(true);

  useEffect(() => {
    if (isFirst) return;
    pauseAudio();
    playAudio();
  }, [currentAudioIndex, music]);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", playNext);

    return () => {
      audioElement.removeEventListener("ended", playNext);
    };
  }, [currentAudioIndex]);

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
    audioElement.src = musics[currentAudioIndex].src;
    audioElement.currentTime = currentTime;
    audioElement.play();
    setPlaying(true);
    setisFirst(false);
  };

  const pauseAudio = () => {
    const audioElement = audioRef.current;
    audioElement.pause();
    setCurrentTime(audioElement.currentTime);
    setisFirst(false);
    setPlaying(false);
  };

  const playNext = () => {
    setCurrentAudioIndex((currentAudioIndex + 1) % musics.length);
    setMusic(musics[(currentAudioIndex + 1) % musics.length]);
    setisFirst(false);
    setCurrentTime(0);
    setProgress(0);
  };

  const playPrevious = () => {
    setCurrentAudioIndex(
      (currentAudioIndex - 1 + musics.length) % musics.length
    );
    setMusic(musics[(currentAudioIndex - 1 + musics.length) % musics.length]);
    setCurrentTime(0);
    setisFirst(false);
    setProgress(0);
  };

  return (
    <Box display="flex" alignItems="center" direction="column">
      <Box position="relative">
        <Mask width={isMobile ? 330 : 600}>
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
            <TapArea onTap={playPrevious}>
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
            <TapArea onTap={playNext}>
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
