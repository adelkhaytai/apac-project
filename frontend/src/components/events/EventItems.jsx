import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const EventItems = ({ event }) => {
  return (
    <div>
      <div className="card p-3" style={{ width: "25rem" }}>
        <div className="col-12">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>{event?.createdAt?.substring(0, 10)}</p> 
            <p>{event?.createdAt?.substring(11, 19)}</p>{" "}
          </div>
          <h2>{event.name}</h2>
          <h4>Location : {event.location}</h4>
          <div className="p-0">
            <h5 className="mt-0">Description:</h5>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItems;
