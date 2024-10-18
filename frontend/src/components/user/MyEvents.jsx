import React, { useEffect } from "react";
import { useDeleteEventMutation, useLazyGetMyEventQuery } from "../../toolkit/api/EventsApi";
import { Link, useParams } from "react-router-dom";

const MyEvents = () => {
  const [myEvent, { data, isFetching, error }] = useLazyGetMyEventQuery();
  const [
    deleteEvent,
    { isLoading, isError: errorDelete, isSuccess: succDelete },
  ] = useDeleteEventMutation();

  useEffect(() => {
    myEvent();
  }, [myEvent]);
  const deleteProductHandler = (id) => {
    deleteEvent(id);
  };
  return (
    <div className="container">
      <h1 className="my-5 text-center">My Events</h1>
      {/* <h4 className="mb-4 text-center">Total Orders: {event.length}</h4> */}
      <div className="row">
        {data?.event?.map((e) => (
          <div key={e._id} className="col-12 mb-4">
            <div className="card p-4">
              <h5 className="card-title mb-3">event #{e._id}</h5>
              <hr />
              <strong>Created at : </strong>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{e?.createdAt?.substring(0, 10)}</p>
                <p>{e?.createdAt?.substring(11, 19)}</p>
              </div>
              <hr />
              <strong>Updated at : </strong>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{e?.updatedAt?.substring(0, 10)}</p>
                <p>{e?.updatedAt?.substring(11, 19)}</p>
              </div>
              <hr />
              <div className="mb-2">
                <strong>Name Event</strong>
                <p className="mb-1">{e.name} TND</p>
              </div>
              <div className="mb-2">
                <strong>Event Description:</strong>
                <p className="mb-1">{e.description}</p>
              </div>
              <div className="mb-3">
                <strong>Event Location:</strong>
                <p className="mb-1">{e.location}</p>
              </div>
              <div>
                <Link
                  to={`/eventUpdate/${e._id}`}
                  className="btn btn-primary me-2"
                >
                  <i className="fa fa-eye" /> Update Event
                </Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteProductHandler(e?._id)}
                  disabled={isLoading}
                >
           <i class="bi bi-archive"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
