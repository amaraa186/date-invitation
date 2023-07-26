import { Link, Box, Mask, Image } from "gestalt";
import { useMediaQuery } from "react-responsive";

const StartSection = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });

  const { picture } = props;

  if (picture)
    return (
      <Box display="flex" direction="column" alignItems="center">
        <Box height={50} />
        <Mask width={isMobile ? 288 : 338}>
          <Image
            alt="image"
            naturalHeight={1}
            naturalWidth={1}
            src="https://res.cloudinary.com/urlan/image/upload/v1690214800/poster_ezmxui.png"
          />
        </Mask>
        <Box>
          <Link href="/home">
            <Mask width={isMobile ? 170 : 220}>
              <Image
                alt="image"
                naturalHeight={1}
                naturalWidth={1}
                src="https://res.cloudinary.com/urlan/image/upload/v1690214800/button_wneiby.png"
              />
            </Mask>
          </Link>
        </Box>
      </Box>
    );
};

export default StartSection;
