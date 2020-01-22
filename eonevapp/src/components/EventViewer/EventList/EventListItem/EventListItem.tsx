import React from "react";
import { Tab, ListGroup, Col, Row, Badge } from "react-bootstrap";
import Event from "../../../../models/Event";
import "./EventListItem.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface EventListItemProps {
  event: Event;
  active: boolean;
  onClickItem(id: string): void;
}

//Displays event details and interactive links, as well as styled badge based on status
const EventListItem: React.FC<EventListItemProps> = props => {
  return (
    <div className="event-item-wrapper">
      <ListGroup>
        <ListGroup.Item
          active={props.active}
          action
          onClick={() => props.onClickItem(props.event.id as string)}
        >
          <Badge
            variant={props.event.closed === null ? "info" : "secondary"}
            pill
            className="pill-spacer"
          >
            {props.event.closed === null ? "open" : "closed"}
          </Badge>
          {props.event.title}
          <FontAwesomeIcon
            icon={props.active ? faChevronUp : faChevronDown}
            className="float-icon-right"
          ></FontAwesomeIcon>
        </ListGroup.Item>
      </ListGroup>
      <Tab.Content>
        <Tab.Pane className="details-view" eventKey={props.event.id}>
          <Row>
            <Col sm={8}>
              {" "}
              {props.event.description !== undefined ? (
                props.event.description!.length > 0 ? (
                  <p>{props.event.description}</p>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {props.event.closed !== null ? (
                <p>This event was closed on {props.event.closed}</p>
              ) : (
                ""
              )}
              {props.event.lastGeometryDate !== undefined ? (
                <p>Last updated on {props.event.lastGeometryDate}</p>
              ) : (
                ""
              )}
              <p>
                View raw data at{" "}
                <a href={props.event.link}>{props.event.link}</a>
              </p>
            </Col>
            <Col sm={4} className="map-button">
              <a
                href={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  props.event.lastGeometryY +
                  "," +
                  props.event.lastGeometryX
                }
                target="_newtab"
              >
                <Button variant="success">View on Google Maps!</Button>
              </a>
            </Col>
          </Row>
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
};

export default EventListItem;
