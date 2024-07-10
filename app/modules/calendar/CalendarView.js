"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Box, Image, Heading, Text, Flex, Button } from "gestalt";
// import { fetchWeather } from "../../../utils/WeatherApi";
import _ from "lodash";
import { gapi } from "gapi-script";

const CalendarView = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [events, setEvents] = useState([]);
  const calendarID = "addressbook#contacts@group.v.calendar.google.com";
  const apiKey = "AIzaSyB2twPKmqSAUkBsDJJYshW5en3z025hTZY";

  const getEvents = (calendarID, apiKey) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };

  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    console.log(events);
    setEvents(events);
  }, []);

  if (isMobile || isTablet)
    return (
      <Box display="flex" height="100vh" position="relative">
        <Box width="100%">
          <Image
            src="https://i.pinimg.com/564x/61/67/25/6167251838f7f8bb55dd1d211c24cce9.jpg"
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
        ></Box>
      </Box>
    );
};

export default CalendarView;
