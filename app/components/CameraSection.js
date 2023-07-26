import { useState } from "react";
import { TapArea, Box, Mask, Image } from "gestalt";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";
import ImageModal from "../components/ImageModal";

const CameraSection = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [imageModal, setImageModal] = useState(false);

  const { onClickCamera = () => {}, picture } = props;

  const onImageClick = () => {
    setImageModal(!imageModal);
  };

  return (
    <Box position="relative" top bottom right left height="100vh">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Box height="100vh">
          <Image
            alt="cover"
            src="https://res.cloudinary.com/urlan/image/upload/v1690258944/back_h7ozvq.svg"
            naturalHeight={1}
            naturalWidth={1}
            fit="cover"
          />
        </Box>
      </motion.div>
      <Box
        position="absolute"
        height="100%"
        width="100%"
        top
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
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

        <div style={{ height: 10 }} />

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
                {/* <Mask width={isMobile ? 100 : 300}> */}
                <Image
                  alt="Camera"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://res.cloudinary.com/urlan/image/upload/v1690208859/Camera_nq02gj.png"
                />
                {/* </Mask> */}
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
              <Box>
                <TapArea onTap={onImageClick}>
                  <Mask
                    width={isMobile ? 180 : 230}
                    height={isMobile ? 200 : 260}
                  >
                    <Image
                      alt="image"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://res.cloudinary.com/urlan/image/upload/v1690286453/Group_29_yia9vw.png"
                    />
                  </Mask>
                </TapArea>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {imageModal && <ImageModal onImageClick={onImageClick} />}
    </Box>
  );
};

export default CameraSection;
