"use client";

import { useRouter } from "next/router";
import { Box, Flex, Heading, TapArea } from "gestalt";
import { fetchWeather } from "../modules/weather/WeatherApi";
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";

const Calendar = () => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    const executeEveryHour = () => {
      fetchWeather().then((res) => {
        if (res.status === 200) setWeatherData(res.data);
      });
    };
    const intervalId = setInterval(executeEveryHour, 3600000);
    executeEveryHour();
    return () => clearInterval(intervalId);
  }, []);

  if (!_.isEmpty(weatherData)) {
    return (
      <Box alignItems="center" display="flex" direction="column">
        <TapArea>
          <Box
            borderStyle="shadow"
            position="relative"
            height={160}
            width={160}
          >
            <div
              style={{
                backgroundColor: "#1C1C1D",
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Flex direction="column" gap={1} alignItems="center">
                <Flex gap={2}>
                  <Heading size="500" color="light">
                    {moment().format("dddd").toString().slice(0, 3)}
                  </Heading>
                  <Heading size="500" color="subtle">
                    {moment().format("MMM Do YY").toString().slice(0, 3)}
                  </Heading>
                </Flex>
                <Heading>
                  <text style={{ fontSize: "45px", color: "white" }}>
                    {moment().format("L").toString().slice(3, 5)}
                  </text>
                </Heading>
              </Flex>
            </div>
          </Box>
        </TapArea>
        <Box height={5} />
        <Heading size="200">Calendar</Heading>
      </Box>
    );
  }

  return;
};

export default Calendar;
