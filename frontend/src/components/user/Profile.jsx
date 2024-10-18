import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyEvents from "./MyEvents";
import { Link } from "react-router-dom";
import {
  useDeleteEventAdminMutation,
  useGetEventsQuery,
} from "../../toolkit/api/EventsApi";
const Profile = () => {
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
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

  const [
    deleteEvent,
    { isLoading: deleteLoading, isError: errorDelete, isSuccess: succDelete },
  ] = useDeleteEventAdminMutation();

  const deleteProductHandler = (id) => {
    deleteEvent(id);
  };
  return (
    <div>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user?.name}</p>
          <h4>Email Address</h4>
          <p>{user?.email}</p>
          <h4>Joined On</h4>
          <p>{user?.createdAt?.substring(0, 10)}</p>
        </div>
      </div>

      {/* admin     */}
      {user?.role === "admin" && (
        <div className="container">
          <h3>Admin Zone</h3>
          <h5>List of Events :</h5>
          <div className="grid-container">
            {data?.events?.map((event, index) => (
              <div className="card p-3" style={{ width: "25rem" }}>
                <div className="col-12">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{event?.createdAt?.substring(0, 10)}</p>
                    <p>{event?.createdAt?.substring(11, 19)}</p>{" "}
                  </div>
                  <h4>{event.name}</h4>
                  <h4>Location : {event.location}</h4>
                </div>
                <Link
                  style={{ textDecoration: "none" }}
                  className="btn btn-primary m-1"
                  to={`/updateEventAdmin/${event?._id}`}
                >
                  <i className="fa fa-eye" /> Update Event
                </Link>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => deleteProductHandler(event?._id)}
                  disabled={deleteLoading}
                >
                  <i class="bi bi-archive"></i>
                </button>
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
            Page {data.currentPage} of {data.totalPages}
          </p>
        </div>
        </div>
      )}
      {/* admin      */}

      <hr />
      <Link style={{ textDecoration: "none" }} to={"/eventsNew"}>
        Create Event
        <i class="bi bi-file-plus"></i>
      </Link>
      <MyEvents />
    </div>
  );
};

export default Profile;
