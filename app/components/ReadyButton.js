import { Box, TapArea } from "gestalt";
import styles from "../page.module.css";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const ReadyButton = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });
  const { onClick = () => {} } = props;

  return (
    <Box
      position="absolute"
      bottom
      marginBottom={12}
      display="flex"
      width="100%"
      paddingX={12}
    >
      <TapArea onTap={onClick}>
        <Box padding={isMobile ? 2 : 4}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <div
              style={{
                background: "#FFD176",
                borderRadius: 39,
                paddingBottom: 6,
                border: "solid",
                borderWidth: 2,
                borderColor: "#474A50",
                boxShadow: "5px 6px 1px 0px #474A50",
              }}
            >
              <p
                className={styles.button}
                style={{ fontSize: isMobile ? 22 : 35 }}
              >
                I’m ready to date!
              </p>
            </div>
          </motion.div>
        </Box>
      </TapArea>
    </Box>
  );
};

export default ReadyButton;
