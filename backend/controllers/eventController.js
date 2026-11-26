const Event = require("../models/Event");
const TicketType = require("../models/TicketType");


const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            date,
            venue,
            image,
            ticketTypes
        } = req.body;

        // Validate required information
        if (
            !title || !description || !category ||
            !date || !venue ||
            !Array.isArray(ticketTypes) ||
            ticketTypes.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required event information and at least one ticket type."
            });
        }

        // Validate ticket types
        for (const ticket of ticketTypes) {
            if (
                !ticket.name ||
                typeof ticket.price !== "number" ||
                !Number.isInteger(ticket.quantity) ||
                ticket.price < 0 ||
                ticket.quantity <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ticket type information."
                });
            }
        }

        // Create event
        const event = await Event.create({
            organizerId: req.user.id,
            title,
            description,
            category,
            date,
            venue,
            image
        });

        // Create ticket types associated with the event
        const tickets = ticketTypes.map(ticket => ({
            eventId: event._id,
            name: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity,
            availableQuantity: ticket.quantity
        }));

        const createdTickets = await TicketType.insertMany(tickets);

        res.status(201).json({
            success: true,
            message: "Event created successfully.",
            data: {
                event,
                ticketTypes: createdTickets
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getOrganizerEvents = async (req, res) => {
    try {
        const events = await Event.find({
            organizerId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        const ticketTypes = await TicketType.find({
            eventId: event._id
        });

        res.status(200).json({
            success: true,
            data: {
                event,
                ticketTypes
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            _id: req.params.eventId,
            organizerId: req.user.id
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found or you are not authorized to edit it."
            });
        }

        if (event.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Cannot edit a cancelled event."
            });
        }

        const allowedFields = [
            "title",
            "description",
            "category",
            "date",
            "venue",
            "image"
        ];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                event[field] = req.body[field];
            }
        }

        await event.save();

        res.status(200).json({
            success: true,
            message: "Event updated successfully.",
            data: event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const cancelEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            _id: req.params.eventId,
            organizerId: req.user.id
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found or you are not authorized."
            });
        }

        if (event.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Event is already cancelled."
            });
        }

        event.status = "cancelled";

        await event.save();

        res.status(200).json({
            success: true,
            message: "Event cancelled successfully.",
            data: event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({
            status: "upcoming",
            date: { $gte: new Date() }
        }).sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createEvent,
    getOrganizerEvents,
    getEventById,
    updateEvent,
    cancelEvent,
    getAllEvents
};