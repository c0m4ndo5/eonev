import React from "react";
import {
  DropdownButton,
  Dropdown,
  Row,
  Col,
  ButtonToolbar,
  Container,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import "./ViewerControls.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Category from "../../../models/Category";

interface ControlsProps {
  categories: Array<Category>;
}

const ViewerControls: React.FC<ControlsProps> = props => {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row className="spaced-toolbar">
            <span className="toolbar-message">
              Show only events in the range:{" "}
            </span>
            <ReactDatePicker
              placeholderText="From"
              onChange={() => {}}
            ></ReactDatePicker>
            <ReactDatePicker
              placeholderText="To"
              onChange={() => {}}
            ></ReactDatePicker>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <span className="toolbar-message">Order by:</span>
            <ButtonToolbar className="spaced-toolbar">
              <DropdownButton
                size="sm"
                variant="secondary"
                id="sortby"
                title="None"
              >
                <Dropdown.Item eventKey="1">Category</Dropdown.Item>
                <Dropdown.Item eventKey="2">Status</Dropdown.Item>
                <Dropdown.Item eventKey="2">Date</Dropdown.Item>
              </DropdownButton>
              <ToggleButtonGroup type="checkbox">
                <ToggleButton value={1} variant="secondary" size="sm">
                  Ascending
                </ToggleButton>
                <ToggleButton value={2} variant="secondary" size="sm">
                  Descending
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Row>

          <Row>
            <span className="toolbar-message">Filter by:</span>
            <ButtonToolbar className="spaced-toolbar">
              <DropdownButton
                size="sm"
                variant="secondary"
                id="category"
                title="Category"
              >
                {props.categories != null ? (
                  props.categories.map(category => (
                    <Dropdown.Item eventKey={category.id?.toString()}>
                      {category.title}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item eventKey="1">Loading...</Dropdown.Item>
                )}
              </DropdownButton>
              <DropdownButton
                size="sm"
                variant="secondary"
                id="status"
                title="Status"
              >
                <Dropdown.Item eventKey="1">Open</Dropdown.Item>
                <Dropdown.Item eventKey="2">Closed</Dropdown.Item>
              </DropdownButton>
            </ButtonToolbar>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewerControls;
