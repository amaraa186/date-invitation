import { Box, Flex, Mask, Image, TapArea, Layer, Text } from "gestalt";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";

const ImageModal = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const { onImageClick = () => {} } = props;

  const onDownloadImage = async () => {
    const image = await fetch(
      "https://res.cloudinary.com/urlan/image/upload/v1690386658/image00001_1_1_1_lcacy3.png"
    );
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "HB.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layer>
      <div
        style={{
          backgroundColor: "#FFB1B1",
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
          <Box width={350} position="relative" height={462}>
            <Box width={350}>
              <Image
                alt="image"
                src="https://res.cloudinary.com/urlan/image/upload/v1690385067/Group_31_mbqtky.svg"
                naturalHeight={1}
                naturalWidth={1}
              />
            </Box>
            <Box
              position="absolute"
              display="flex"
              direction="column"
              height="100%"
              width="100%"
              top
            >
              <Box width="100%" display="flex" justifyContent="end">
                <Box>
                  <TapArea onTap={onImageClick}>
                    <Box width={40} height={40} />
                  </TapArea>
                </Box>
              </Box>
              <Box
                height="100%"
                marginEnd={8}
                marginStart={2}
                marginTop={2}
                marginBottom={4}
              >
                <Image
                  alt="image"
                  src="https://res.cloudinary.com/urlan/image/upload/v1690386658/image00001_1_1_1_lcacy3.png"
                  naturalHeight={1}
                  naturalWidth={1}
                  fit="cover"
                />
              </Box>
              <TapArea onTap={onDownloadImage}>
                <Box marginStart={2} marginEnd={8} marginBottom={6}>
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
                        Download
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

export default ImageModal;
