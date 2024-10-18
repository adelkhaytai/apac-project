import React, { useState } from "react";
import { useGetEventsQuery } from "../../toolkit/api/EventsApi";
import EventItems from "./EventItems";
import "./style.css";
const Events = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isError } = useGetEventsQuery({
    page,
    limit: 4,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="">
      <div className="container">
        <div
          className="grid-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "60px",
            justifyContent: "center",
          }}
        >
          {data?.events?.map((event, index) => (
            <div
              key={index}
              className="grid-item p-2"
            >
              <EventItems event={event} />
            </div>
          ))}
        </div>
        <div>
          <button
            className="btn btn-primary m-1"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <button className="btn btn-primary m-1" onClick={handleNextPage}>
            Next
          </button>
          <p>
            Page {data?.currentPage} of {data?.totalPages}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Events;
