import React, { useState } from "react";
import { Container, Tab, Row } from "react-bootstrap";
import EventListItem from "./EventListItem/EventListItem";
import Event from "../../../models/Event";

interface EventListProps {
  events: Array<Event>;
}

const EventList: React.FC<EventListProps> = props => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <Container>
      {props.events.length !== 0 ? (
        props.events.map(e => (
          <Row>
            <Tab.Container activeKey={activeItem}>
              <EventListItem
                active={activeItem === e.id}
                event={e}
                onClickItem={setActiveItem}
              ></EventListItem>
            </Tab.Container>
          </Row>
        ))
      ) : (
        <span>Hold on a second..</span>
      )}
    </Container>
  );
};

export default EventList;
