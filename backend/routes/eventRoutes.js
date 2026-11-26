
const express = require("express");
const router = express.Router();

const {
    createEvent,
    getOrganizerEvents,
    getEventById,
    updateEvent,
    cancelEvent,
    getAllEvents
} = require("../controllers/eventController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllEvents);

// Protected organizer routes
router.get(
    "/organizer/events",
    protect,
    authorize("organizer"),
    getOrganizerEvents
);

router.post(
    "/",
    protect,
    authorize("organizer"),
    createEvent
);

router.get("/:eventId", getEventById);

router.patch(
    "/:eventId",
    protect,
    authorize("organizer"),
    updateEvent
);

router.patch(
    "/:eventId/cancel",
    protect,
    authorize("organizer"),
    cancelEvent
);

module.exports = router;
