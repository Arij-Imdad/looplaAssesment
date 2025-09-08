import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/card";
import { Typography, TextField } from "@mui/material";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        const savedList = localStorage.getItem("events");
        const existingEvents = savedList ? JSON.parse(savedList) : [];

        const combinedEvents = existingEvents.concat(res.data);

        // Sort by title length first, then by date (ascending)
        combinedEvents.sort((a, b) => {
            const titleDiff = a.title.length - b.title.length;
            if (titleDiff !== 0) return titleDiff;
            return new Date(a.date) - new Date(b.date);
        });

        setEvents(combinedEvents);
      } catch (error) {
        console.log('error')
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (value) => {
    setSearchText(value);

    if (value.length > 0) {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilterEvents(filtered);
    } else {
      setFilterEvents([]);
    }
  };

  const displayedEvents =
    searchText.length > 0 ? filterEvents : events;

  return (
    <div>
      <Typography variant="h5" mt={3} ml={2.5} fontWeight="bold">
        Event List
      </Typography>

      <TextField
        id="search-event"
        label="Search Event"
        variant="outlined"
        onChange={(e) => handleChange(e.target.value)}
        value={searchText}
        sx={{ margin: '20px', width:'97%'}}
      />

      {displayedEvents.map((event) => (
        <EventCard data={event} key={event.title} />
      ))}

      {searchText.length > 0 && filterEvents.length === 0 && (
        <Typography variant="h6" mt={3} ml={2.5} fontWeight="bold">
          No Event Found
        </Typography>
      )}
    </div>
  );
};

export default HomePage;
