import { Box, Flex, Mask, Image, TapArea, Layer, Text } from "gestalt";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";

const NewsModal = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const { onShowNews = () => {} } = props;

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
          position="absolute"
          height="100%"
          width="100%"
          top
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={isMobile ? 350 : 600}
            height={isMobile ? 460 : 800}
            position="relative"
          >
            <Box>
              <Mask width={isMobile ? 350 : 600} height={isMobile ? 460 : 800}>
                <Image
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://res.cloudinary.com/urlan/image/upload/v1690286456/Group_31_o2xwv5.png"
                />
              </Mask>
            </Box>

            <Box
              position="absolute"
              top
              width="100%"
              height="100%"
              paddingY={12}
              paddingX={8}
            >
              <Box paddingY={4}>
                <p
                  className={styles.weather}
                  style={{ fontSize: isMobile ? 35 : 50 }}
                >
                  7.30nd yu boloh gej bga ve?
                </p>
              </Box>
              <Box paddingY={3}>
                <Text color="subtle" size={isMobile ? 300 : 500}>
                  7-р сарын 30 ны өдөр Амундагийн төрсөн өдөр тохиож байгаа тул
                  Амундага таныг болзоонд урьж байна.
                </Text>
                <Box height={10} />
                <p
                  className={styles.weather}
                  style={{ fontSize: isMobile ? 20 : 35 }}
                >
                  Date: 2023.7.30 - 11:00
                </p>
                <p
                  className={styles.weather}
                  style={{ fontSize: isMobile ? 20 : 35 }}
                >
                  Location: Amundagiin geriin uud
                </p>
              </Box>
            </Box>
            <Box position="absolute" top right>
              <TapArea onTap={onShowNews}>
                <Box width={isMobile ? 40 : 70} height={isMobile ? 40 : 70} />
              </TapArea>
            </Box>
            <Box
              position="absolute"
              bottom
              left
              marginStart={4}
              marginBottom={8}
            >
              <TapArea onTap={onShowNews}>
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
                        padding: 2,
                      }}
                    >
                      <p
                        className={styles.button}
                        style={{ fontSize: isMobile ? 22 : 35 }}
                      >
                        Durtaiya
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

export default NewsModal;
