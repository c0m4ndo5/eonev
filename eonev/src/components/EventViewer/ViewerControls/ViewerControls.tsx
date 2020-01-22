import React, { useState, useEffect } from "react";
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
import EONEVAPIOptions from "../../../API/eonevapioptions";
import { Button } from "react-bootstrap";

interface ControlsProps {
  categories: Array<Category>;
  onFilterChange(filters: EONEVAPIOptions): void;
}

//Renders and controls filters for the event list, ensuring they are valid
const ViewerControls: React.FC<ControlsProps> = props => {
  const [filterCategory, setFilterCategory] = useState<Category>();
  const [filterStatus, setFilterStatus] = useState<string>();
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [orderBy, setOrderBy] = useState<string>();
  const [direction, setDirection] = useState<string>();
  const onFilterChange = props.onFilterChange;
  useEffect(() => {
    let options: EONEVAPIOptions = {};
    if (filterCategory !== undefined) options.category = filterCategory.id;
    if (filterStatus !== undefined) options.status = filterStatus;
    if (from !== null) options.from = from;
    if (to !== null) options.to = to;
    if (orderBy !== undefined) options.orderby = orderBy;
    if (orderBy !== undefined && direction !== undefined)
      options.orderby += direction;
    onFilterChange(options);
  }, [
    filterCategory,
    filterStatus,
    from,
    to,
    orderBy,
    direction,
    onFilterChange
  ]);
  const resetState = function() {
    setFilterCategory(undefined);
    setFilterStatus("open");
    setFrom(null);
    setTo(null);
    setOrderBy(undefined);
    setDirection(undefined);
  };
  return (
    <Container>
      <Row>
        <Col sm={7}>
          <Row className="spaced-toolbar">
            <span className="toolbar-message">
              Show only events in the range:{" "}
            </span>
            <ReactDatePicker
              placeholderText="From"
              onChange={setFrom}
              selected={from}
            ></ReactDatePicker>
            <ReactDatePicker
              placeholderText="To"
              onChange={setTo}
              selected={to}
            ></ReactDatePicker>
          </Row>
          <Row>
            <Button onClick={resetState} variant="secondary" size="sm">
              Reset
            </Button>
          </Row>
        </Col>
        <Col sm={5} className="no-padding-right">
          <Row>
            <Col sm="3" className="no-padding-right">
              <span className="toolbar-message">Order by:</span>
            </Col>
            <Col sm="9" className="no-padding-right">
              <ButtonToolbar className="spaced-toolbar">
                <DropdownButton
                  size="sm"
                  variant="secondary"
                  id="sortby"
                  title={orderBy === undefined ? "None" : orderBy}
                  onSelect={setOrderBy}
                >
                  <Dropdown.Item eventKey="category">Category</Dropdown.Item>
                  <Dropdown.Item eventKey="status">Status</Dropdown.Item>
                  <Dropdown.Item eventKey="date">Date</Dropdown.Item>
                </DropdownButton>
                <ToggleButtonGroup type="checkbox">
                  <ToggleButton
                    onClick={() => setDirection("asc")}
                    value={"asc"}
                    variant={direction === "asc" ? "info" : "secondary"}
                    size="sm"
                  >
                    Ascending
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setDirection("desc")}
                    value={"desc"}
                    variant={direction === "desc" ? "info" : "secondary"}
                    size="sm"
                  >
                    Descending
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col sm="3" className="no-padding-right">
              <span className="toolbar-message">Filter by:</span>
            </Col>
            <Col sm="9" className="no-padding-right">
              <ButtonToolbar className="spaced-toolbar">
                <DropdownButton
                  size="sm"
                  variant="secondary"
                  id="category"
                  title={
                    filterCategory === undefined
                      ? "Category"
                      : filterCategory.title
                  }
                >
                  {props.categories != null ? (
                    props.categories.map(category => (
                      <Dropdown.Item
                        key={category.id?.toString()}
                        onClick={() => setFilterCategory(category)}
                        eventKey={category.id?.toString()}
                      >
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
                  title={filterStatus === undefined ? "Status" : filterStatus}
                  onSelect={setFilterStatus}
                >
                  <Dropdown.Item eventKey="open">Open</Dropdown.Item>
                  <Dropdown.Item eventKey="closed">Closed</Dropdown.Item>
                </DropdownButton>
              </ButtonToolbar>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewerControls;
