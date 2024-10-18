import React, { useEffect, useState } from 'react'
import { useGetEventDetailsQuery, useUpdateEventMutation } from '../../toolkit/api/EventsApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EventUpdate = () => {


  const navigate = useNavigate();
  const params = useParams();
  const [updateEvent, { isLoading, error, isSuccess }] = useUpdateEventMutation();
  const { data } = useGetEventDetailsQuery(params?.id);


  const [event, setEvent] = useState({
    name: "",
    description: "",
    loaction: "",
  });

  const { name, description, location } = event;

  useEffect(() => {
    if (data) {
      setEvent({
        name: data?.event?.name,
        description: data?.event?.description,
        location: data?.event?.location,
      
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Event Updated");
      navigate("/profile");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
      setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateEvent({ id: params?.id, body: event });
  };


  return (
    <div className="row wrapper">
    <div className="col-10 col-lg-10 mt-5 mt-lg-0">
      <form className="shadow rounded bg-body" onSubmit={submitHandler}>
        <h2 className="mb-4">Update Event</h2>
        <div className="mb-3">
          <label htmlFor="name_field" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description_field" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description_field"
            rows={8}
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <div className="mb-3 col">
            <label  className="form-label">
              Location
            </label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              name="location"
              value={location}
              onChange={onChange}
            />
          </div>
        
        </div>
        <button
          type="submit"
          className="btn w-100 py-2"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "UPDATE"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default EventUpdate
