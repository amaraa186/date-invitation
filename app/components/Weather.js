"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Flex, Heading, TapArea } from "gestalt";
import { fetchWeather } from "../modules/weather/WeatherApi";
import _ from "lodash";

const Weather = () => {
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

  const router = useRouter();

  if (!_.isEmpty(weatherData)) {
    return (
      <Box alignItems="center" display="flex" direction="column">
        <TapArea onTap={() => router.push("/weather")}>
          <Box
            borderStyle="shadow"
            height={160}
            width={160}
            position="relative"
            rounding={3}
          >
            <div
              style={{
                backgroundColor: weatherData.current.is_day
                  ? "#FFFFFE"
                  : "#242940",
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Flex direction="column" gap={1}>
                <Heading
                  size="400"
                  color={weatherData.current.is_day ? "dark" : "light"}
                >
                  {weatherData.location.name}
                </Heading>
                <Heading
                  size="600"
                  color={weatherData.current.is_day ? "dark" : "light"}
                >
                  {weatherData.current.temp_c}°
                </Heading>
                <Heading
                  size="200"
                  color={weatherData.current.is_day ? "dark" : "light"}
                >
                  {weatherData.current.condition.text}
                </Heading>
              </Flex>
            </div>
          </Box>
        </TapArea>
        <Box height={5} />
        <Heading size="200">Weather</Heading>
      </Box>
    );
  }

  return;
};

export default Weather;
