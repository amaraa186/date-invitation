"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Box, Image, Heading, Text, Flex, Button } from "gestalt";
import { useRouter } from "next/router";
import moment from "moment";
import SwipeableButton from "../components/SwipeableButton/SwipeableButton";

export default function Landing() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [currentTime, setCurrentTime] = useState(moment().format("LT"));
  const [currentDate, setCurrentDate] = useState(moment().format("ll"));
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("LT"));
    }, 60000); // 60000 ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment().format("ll"));
    }, 60000); // 60000 ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const onSuccess = () => {
    router.push("/home");
  };

  if (isTabletOrMobile)
    return (
      <Box display="flex" height="100vh" position="relative">
        <Box width="100%">
          <Image
            src="https://i.pinimg.com/originals/f7/23/a3/f723a30d4960bc69291f8a0de85ec5ee.jpg"
            alt="bg"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Box
          position="absolute"
          bottom
          display="flex"
          justifyContent="center"
          alignItems="end"
          height="100vh"
          width="100%"
        >
          <Box
            paddingY={8}
            paddingX={5}
            width="100%"
            height="100%"
            display="flex"
            direction="column"
            justifyContent="between"
          >
            <Box display="flex" direction="column" alignItems="center">
              <Text size="400">{currentDate}</Text>
              <Text size="600" weight="bold">
                {currentTime}
              </Text>
            </Box>
            <Box>
              <SwipeableButton
                onSuccess={onSuccess}
                color="pink"
                text="SLIDE TO UNLOCK"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
}
