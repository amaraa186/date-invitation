"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Box, Image, Heading, Text, Flex, Button } from "gestalt";
import { fetchWeather } from "../weather/WeatherApi";
import _ from "lodash";

const WeatherView = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
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

  if (isMobile || isTablet)
    if (!_.isEmpty(weatherData))
      return (
        <Box display="flex" height="100vh" position="relative">
          <Box width="100%">
            <Image
              src={
                weatherData.current.is_day
                  ? "https://i.pinimg.com/236x/78/c4/7c/78c47c9529c85b6c01cc0c923e9d38f3.jpg"
                  : "https://i.pinimg.com/564x/61/67/25/6167251838f7f8bb55dd1d211c24cce9.jpg"
              }
              alt="bg"
              fit="cover"
              naturalHeight={1}
              naturalWidth={1}
            />
          </Box>
          <Box
            position="absolute"
            display="flex"
            // color="brand"
            justifyContent="center"
            height="51vh"
            width="100%"
          >
            <Flex
              direction="column"
              justifyContent="around"
              alignItems="center"
            >
              <Box display="flex" direction="column" alignItems="center">
                <Heading
                  size="600"
                  color={weatherData.current.is_day ? "dark" : "light"}
                >
                  {weatherData.location.name}
                </Heading>
                <Text
                  size="400"
                  color={weatherData.current.is_day ? "dark" : "light"}
                >
                  {weatherData.current.last_updated}
                </Text>
              </Box>
              <Heading>
                <text
                  style={{
                    fontSize: "55px",
                    color: weatherData.current.is_day ? "black" : "white",
                  }}
                >
                  {weatherData.current.temp_c}°C
                </text>
              </Heading>
              {/* <Text
                size="500"
                color={weatherData.current.is_day ? "dark" : "light"}
              >
                {weatherData.current.condition.text}
              </Text> */}
            </Flex>
          </Box>
        </Box>
      );
};

export default WeatherView;
