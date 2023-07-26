import { TapArea, Box, Mask, Image } from "gestalt";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";

const CameraSection = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });

  const { onClickCamera = () => {}, picture } = props;

  return (
    <Box position="relative">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className={styles.background}>
          <img
            src={
              isMobile
                ? "https://res.cloudinary.com/urlan/image/upload/v1690258944/back_h7ozvq.svg"
                : "https://res.cloudinary.com/urlan/image/upload/v1690263209/Group_18_l3hkft.svg"
            }
            height="100%"
            width="100%"
          />
        </div>
      </motion.div>

      <Box
        display="flex"
        direction="column"
        height="100vh"
        justifyContent="center"
      >
        <p
          className={styles.cheese}
          style={{
            fontSize: isMobile ? 25 : 35,
          }}
        >
          <Typewriter
            cursor
            cursorBlinking
            delaySpeed={1000}
            deleteSpeed={30}
            // loop={0}
            typeSpeed={95}
            words={["Say Cheeeeeese!"]}
          />
        </p>

        <div style={{ height: 15 }} />

        <Box display="flex" justifyContent="center" position="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Box width={isMobile ? 250 : 300}>
              <TapArea onTap={onClickCamera}>
                <Mask width={isMobile ? 250 : 300}>
                  <Image
                    alt="Camera"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://res.cloudinary.com/urlan/image/upload/v1690208859/Camera_nq02gj.png"
                  />
                </Mask>
              </TapArea>
            </Box>
          </motion.div>
          {picture && (
            <Box
              position="absolute"
              top
              display="flex"
              alignItems="center"
              width="100%"
              direction="column"
            >
              <Box height={isMobile ? 170 : 205} width="100%" />
              <Mask width={isMobile ? 180 : 230} height={isMobile ? 200 : 260}>
                <Image
                  alt="image"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://res.cloudinary.com/urlan/image/upload/v1690286453/Group_29_yia9vw.png"
                />
              </Mask>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CameraSection;
