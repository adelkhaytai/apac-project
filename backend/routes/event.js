import express from "express";
import { authorizeRoles, isAuthinticator } from "../middlewares/auth.js";
import {
  deleteEvent,
  deleteEventAdmin,
  getALLEvent,
  getFilterEvents,
  getSingelEvent,
  myEvents,
  newEvent,
  updateEvent,
  updateEventAdmin,
} from "../controllers/eventsControllers.js";

const router = express.Router();

router.post("/eventsNew",isAuthinticator,newEvent);

router.post("/myEvents",isAuthinticator,myEvents);

router.get("/getAllEvents", getALLEvent);

router.get("/eventsFilter", getFilterEvents);

router.get("/event/:id", getSingelEvent);

router.put("/updateEvent/:id", isAuthinticator, updateEvent);

router.delete("/deleteEvent/:id", isAuthinticator, deleteEvent);


//admin routes
router.put("/admin_updateEvent/:id", isAuthinticator, authorizeRoles('admin'), updateEventAdmin);
router.delete("/admin_deleteEvent/:id", isAuthinticator, authorizeRoles('admin'), deleteEventAdmin);


export default router;
