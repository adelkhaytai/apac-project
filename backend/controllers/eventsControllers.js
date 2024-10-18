import Events from "../models/events.js"
import APIFilters from "../utils/apiFilter.js";


//users controllers :

export const newEvent = async (req, res) => {
    try {
      req.body.user = req.user._id;
      const event = await Events.create(req.body);
      res.status(200).json({ message: "event saved", event });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error event not created",
        error: error.message,
      });
    }
  };

  export const getALLEvent = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const skip = (page - 1) * limit;
      const events = await Events.find().skip(skip).limit(limit);
      const countevents = await Events.countDocuments();
      res.status(200).json({
        success: true,
        countevents,
        events,
        currentPage: page,
        totalPages: Math.ceil(countevents / limit),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Fetching Events",
        error: error.message,
      });
    }
  };
  


  export const myEvents = async(req,res)=>{
    try {
      const event = await Events.find({user : req.user._id})
      res.status(200).json({
        success : true,
        message : "Events Fetched Successfully",
        num : event.length,
        event 
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Error WHile Fetching events",
        error: error.message,
      });
    }
  }  

  export const getFilterEvents = async (req, res) => {
    try {
      const resPerPage = 4;
      const apiFilter = new APIFilters(Events, req.query);
      
      await apiFilter.search();

      //  apiFilter.filters();  
  
      let events = await apiFilter.query

      const filterEventsCount = events.length;

      apiFilter.pagination(resPerPage);
      events = await apiFilter.query.clone();
  
      res.status(200).json({
        filterEventsCount,
        resPerPage,
        events,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

  export const getSingelEvent = async (req, res, next) => {
    try {
      const event = await Events.findById(req.params.id)
      if (!event) return res.status(404).json("event not found");
      res.status(200).json(event);
    
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Fetching event",
        error: error.message,
      });
    }
  };
  
  export const updateEvent = async (req, res) => {
    try {
    
      let event = await Events.findById(req.params.id);
      if (!event) return console.log("event not found ?");
      event = await Events.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: " error event not updated",
        error: error.message,
      });
    }
  };
  

  export const deleteEvent = async (req, res) => {
    try {
      let event = await Events.findById(req.params.id);
      if (!event) return console.log("event not found ?");
      event = await Events.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "event deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Fetching event",
        error: error.message,
      });
    }
  };



  // for admin controllers :

  export const updateEventAdmin = async (req, res) => {
    try {
      let event = await Events.findById(req.params.id);
      if (!event) return console.log("event not found ?");
      event = await Events.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: " error event not updated",
        error: error.message,
      });
    }
  };
  

  export const deleteEventAdmin = async (req, res) => {
    try {
      let event = await Events.findById(req.params.id);
      if (!event) return console.log("event not found ?");
      event = await Events.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "event deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Fetching event",
        error: error.message,
      });
    }
  };









