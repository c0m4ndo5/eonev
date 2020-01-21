import React from "react";
import { Tab, ListGroup, Col, Row } from "react-bootstrap";
import Event from "../../../../models/Event";
import "./EventListItem.css";
import { Button } from "react-bootstrap";

interface EventListItemProps {
  event: Event;
  active: boolean;
  onClickItem(id: string): void;
}

const EventListItem: React.FC<EventListItemProps> = props => {
  return (
    <div className="event-item-wrapper">
      <ListGroup>
        <ListGroup.Item
          active={props.active}
          action
          onClick={() => props.onClickItem(props.event.id as string)}
        >
          {props.event.title}
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
                  "https://worldview.earthdata.nasa.gov/?e=" + props.event.id
                }
                target="_newtab"
              >
                <Button variant="success">View on map!</Button>
              </a>
            </Col>
          </Row>
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
};

export default EventListItem;
