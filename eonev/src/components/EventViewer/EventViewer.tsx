import React, { useEffect, useState } from "react";
import ViewerControls from "./ViewerControls/ViewerControls";
import EventList from "./EventList/EventList";
import EONEVAPI from "../../API/eonevapi";
import Category from "../../models/Category";
import Event from "../../models/Event";

const EventViewer: React.FC = () => {
  const [categories, setCategories] = useState(new Array<Category>());
  const [events, setEvents] = useState(new Array<Event>());
  useEffect(() => {
    (async function f() {
      var categories = await EONEVAPI.getCategories();
      setCategories(categories);
      var events = await EONEVAPI.getEvents({});
      setEvents(events);
    })();
  }, []);
  return (
    <div>
      <h4>
        Below you will find a list of all events retrieved from EONET. Use the
        dropdowns below to filter and sort!
      </h4>
      <ViewerControls categories={categories}></ViewerControls>
      <EventList events={events}></EventList>
    </div>
  );
};

export default EventViewer;
