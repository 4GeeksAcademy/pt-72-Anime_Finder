import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Notifications from './notifications';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  const showPool = [
    "Solo Leveling",
    "Jujutsu Kisen",
    "Bleach",
    "Let this Grieving Soul Retire",
    "Dragon Ball Daima",
    "Dragon Ball Super",
    "Overlord",
    "Tower of God",
    "Wistoria: Wand & Sword",
    "My Hero Academia",
    "Goodbye: Dragon Life",
  ];

  const getRandomShows = () => {
    const randomCount = Math.floor(Math.random() * 3) + 1; 
    const shuffledShows = [...showPool].sort(() => Math.random() - 0.5); 
    return shuffledShows.slice(0, randomCount); 
  };

  const [shows, setShows] = useState({
    "2024-11-19": getRandomShows(),
    "2024-11-23": getRandomShows(),
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

    const formattedDate = newDate.toISOString().split("T")[0];
    if (!shows[formattedDate]) {
      setShows((prev) => ({
        ...prev,
        [formattedDate]: getRandomShows(),
      }));
    }
  };

  const handleAddShow = () => {
    const showName = prompt("Enter show name:");
    if (showName) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setShows((prev) => ({
        ...prev,
        [formattedDate]: [...(prev[formattedDate] || []), showName],
      }));
    }
  };

  const selectedDateShows = shows[selectedDate.toISOString().split("T")[0]] || [];

    // data.broadcast.day for fetching the animes for the day selected on the calendar
  // use this URL to get to data.broadcast.day https://api.jikan.moe/v4/anime
  // that way when a user clicks on a date, it will display the animes for that day

  return (
    <div className="calendar-container">
      <Notifications calendarShows={shows} />
      <div className="calendar-box">
      <h2>Favorite Shows Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return shows[formattedDate] ? "highlight" : null;
        }}
      />
      <h3>Shows on {selectedDate.toDateString()}:</h3>
      <ul>
        {selectedDateShows.map((show, index) => (
          <li key={index}>{show}</li>
        ))}
      </ul>
      <button onClick={handleAddShow}>Add Show</button>
    </div>
  </div>
  );
};

export default MyCalendar;
