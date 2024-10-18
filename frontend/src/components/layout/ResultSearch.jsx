import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetEventsFilterQuery } from "../../toolkit/api/EventsApi";
import EventItems from "../events/EventItems";

const ResultSearch = () => {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  
  const params = { page, keyword };
  const { data, isLoading, error, isError } = useGetEventsFilterQuery(params);

  return (
    <div>
      <section id="products" className="mt-5">
        <div className="container">
          <div className="row">
            {data?.events?.map((event) => (
              <div className="col" key={event._id}>
                <EventItems event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultSearch;
