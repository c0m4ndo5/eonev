import React, { useEffect, useState } from "react";
import ViewerControls from "./ViewerControls/ViewerControls";
import EventList from "./EventList/EventList";
import EONEVAPI from "../../API/eonevapi";
import Category from "../../models/Category";
import Event from "../../models/Event";
import EONEVAPIOptions from "../../API/eonevapioptions";

//Calls and stores data in it's state for available events/categories
//If filters change, refreshes the results accordingly using React hooks
//The data is passed down to child components
const EventViewer: React.FC = () => {
  const [categories, setCategories] = useState(new Array<Category>());
  const [events, setEvents] = useState(new Array<Event>());
  const [filters, setFilters] = useState<EONEVAPIOptions>({});
  const [textIfEmpty, setTextIfEmpty] = useState("Hang on a second...");
  useEffect(() => {
    (async function f() {
      var categories = await EONEVAPI.getCategories();
      setCategories(categories);
      try {
        var events = await EONEVAPI.getEvents({});
        setEvents(events);
      } catch (error) {
        setTextIfEmpty(
          "There was an error retrieving the results! Please check the application's readme file."
        );
      }
    })();
  }, []);
  useEffect(() => {
    (async function f() {
      if (Object.entries(filters).length !== 0) {
        setTextIfEmpty("Updating...");
        setEvents(new Array<Event>());
        try {
          var events = await EONEVAPI.getEvents(filters!);
          if (events.length === 0) setTextIfEmpty("No results!");
          setEvents(events);
        } catch (error) {
          setTextIfEmpty(
            "There was an error retrieving the results! Please check the application's readme file."
          );
        }
      }
    })();
  }, [filters]);
  return (
    <div>
      <h4>
        Below you will find a list of all events retrieved from EONET. <br></br>{" "}
      </h4>
      <p>
        Use the dropdowns below to filter and sort! By default, only open events
        are shown (to a hard limit of 50)
      </p>
      <ViewerControls
        categories={categories}
        onFilterChange={setFilters}
      ></ViewerControls>
      {events.length === 0 ? (
        textIfEmpty
      ) : (
        <EventList events={events}></EventList>
      )}
    </div>
  );
};

export default EventViewer;
