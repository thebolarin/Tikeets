const { BadRequestError, NotFoundError, } = require('@bolarin/common');
const Event = require('../../models/event');


exports.getEvents = async (req, res) => {
  const events = await Event.find({})

  return res.send(events)

}

exports.createEvent = async (req, res) => {
  const { title, location, price, date, time } = req.body;

  const event = new Event({
    title, location,price, date, time
  });
  await event.save();

  res.status(201).send(event);
}

exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    throw new NotFoundError();
  }

  if (event.orderId) {
    throw new BadRequestError('Cannot edit a reserved ticket');
  }

  // if (event.userId !== req.currentUser!.id) {
  //   throw new NotAuthorizedError();
  // }

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


exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) throw new BadRequestError("Event not found");

  await event.remove();

  res.send(event);
}