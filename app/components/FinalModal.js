import { Box, Flex, Mask, Image, TapArea, Layer, Text } from "gestalt";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";

const FinalModal = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });
  const { onClick = () => {} } = props;

  return (
    <Layer>
      <div
        style={{
          background: "#FFB1B1",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: "fixed",
        }}
      >
        <div className={styles.background}>
          <img
            src={
              isMobile
                ? "https://res.cloudinary.com/urlan/image/upload/v1690277250/Group_27_xeugcs.svg"
                : "https://res.cloudinary.com/urlan/image/upload/v1690282988/Group_28_fwderw.png"
            }
            height="100%"
            width="100%"
          />
        </div>
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={isMobile ? 350 : 600}
            height={isMobile ? 170 : 290}
            position="relative"
          >
            <Box>
              <Mask width={isMobile ? 350 : 600} height={isMobile ? 170 : 290}>
                <Image
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://res.cloudinary.com/urlan/image/upload/v1690286557/player_ifudzc.png"
                />
              </Mask>
            </Box>
            <Box position="absolute" top width="100%" height="100%" padding={8}>
              <Box paddingY={2}>
                <p
                  className={styles.button}
                  style={{ fontSize: isMobile ? 22 : 38 }}
                >
                  Urilga huleen avsand bayarlalaa. Udahgui uulzay brodiii ❤️❤️❤️
                </p>
              </Box>
              {!isMobile && <Box height={25} />}
              <TapArea onTap={onClick}>
                <Box padding={2}>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <div
                      style={{
                        background: "#FF9C9C",
                        borderRadius: 39,
                        paddingBottom: 6,
                        border: "solid",
                        borderWidth: isMobile ? 2 : 3,
                        borderColor: "#474A50",
                        boxShadow: "5px 6px 1px 0px #474A50",
                      }}
                    >
                      <p
                        className={styles.button}
                        style={{ fontSize: isMobile ? 22 : 42 }}
                      >
                        Okay Bro
                      </p>
                    </div>
                  </motion.div>
                </Box>
              </TapArea>
            </Box>
          </Box>
        </Box>
      </div>
    </Layer>
  );
};

export default FinalModal;
