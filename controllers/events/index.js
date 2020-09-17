const { BadRequestError, NotFoundError, } = require('@bolarin/common');
const Event = require('../../models/event');

// @desc    Get all upcoming event
// @route   GET /events
exports.getEvents = async (req, res) => {
  const events = await Event.find({})

  return res.send(events)

}

// @desc    Admin route to create a new event
// @route   POST /events
exports.createEvent = async (req, res) => {
  const { title, location, price, date, time } = req.body;

  const event = new Event({
    title, location,price, date, time
  });
  await event.save();

  res.status(201).send(event);
}


// @desc    Admin route to update an event
// @route   PATCH /events/:eventId
exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    throw new NotFoundError();
  }

  if (event.orderId) {
    throw new BadRequestError('Cannot edit a reserved ticket');
  }

  event.set({
    title: req.body.title,
    location: req.body.location,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
  });
  await event.save();


  res.send(event);
}

// @desc    Admin route to delete an event
// @route   POST /events/:eventId
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) throw new BadRequestError("Event not found");

  await event.remove();

  res.send(event);
}