import React, { useState } from "react";
import { Container, Tab, Row } from "react-bootstrap";
import EventListItem from "./EventListItem/EventListItem";
import Event from "../../../models/Event";

interface EventListProps {
  events: Array<Event>;
}

//Lists the events and tracks currently selected one
const EventList: React.FC<EventListProps> = props => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <Container>
      {props.events.map(e => (
        <Row key={e.id}>
          <Tab.Container activeKey={activeItem}>
            <EventListItem
              active={activeItem === e.id}
              event={e}
              onClickItem={id =>
                activeItem === id ? setActiveItem("") : setActiveItem(id)
              }
            ></EventListItem>
          </Tab.Container>
        </Row>
      ))}
    </Container>
  );
};

export default EventList;
