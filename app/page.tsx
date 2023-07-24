'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { TapArea, Box, Mask, Image } from 'gestalt';
import { Typewriter } from 'react-simple-typewriter'

import 'gestalt/dist/gestalt.css';

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [picture, setPicture] = useState(false)

  const onClickCamera = () => {
    setPicture(!picture)
  }

  if(!isTabletOrMobile)
    return (<></>)

  return (
    <div className={styles.main}>
      <Box position="relative" display='flex' direction="column" height="100vh" width="100%" justifyContent='center'>
        <div className={styles.background}>
          <img src='https://res.cloudinary.com/urlan/image/upload/v1690208859/background_pdzba9.png' height="100%"/>
        </div>
        <p className={styles.cheese}>
          <Typewriter
            cursor
            cursorBlinking
            delaySpeed={1000}
            deleteSpeed={30}
            loop={0}
            typeSpeed={95}
            words={["Say Cheeeeeese!"]}
          />
        </p>
        <div style={{height: 15}} />
        <Box display="flex" justifyContent="center" position="relative">
          <Box width={250}>
            <TapArea
              onTap={onClickCamera}
            >
                <Mask width={250}>
                  <Image
                    alt="Camera"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://res.cloudinary.com/urlan/image/upload/v1690208859/Camera_nq02gj.png"
                  />
                </Mask>
              </TapArea>
            </Box>
          {
            picture && (
              <Box position="absolute" top display='flex' alignItems='center' width="100%" direction='column'>
                <Box height={170} width={1} />
                <Mask width={180}>
                  <Image alt="image"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://res.cloudinary.com/urlan/image/upload/v1690214006/jaaz_hfgfuw.png" />
                </Mask>
              </Box>
            )
          }
        </Box>
      </Box>
      {
        picture && (
          <Box display='flex' direction="column" alignItems='center'>
            <Box height={50} />
              <Mask width={288}>
                <Image 
                  alt="image"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://res.cloudinary.com/urlan/image/upload/v1690214800/poster_ezmxui.png"
                />
              </Mask>
              <Box>
                <TapArea onTap={() => {}}>
                  <Mask width={170}>
                    <Image 
                      alt="image"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://res.cloudinary.com/urlan/image/upload/v1690214800/button_wneiby.png"
                    />
                  </Mask>
                </TapArea>
              </Box>
          </Box>
        )
      }
    </div>
  )
}
