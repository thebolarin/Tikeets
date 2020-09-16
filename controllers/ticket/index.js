const { NotFoundError, NotAuthorizedError, OrderStatus } = require('@bolarin/common');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');
const Event = require('../../models/event');
const sendEmail = require('../../utils/send-email');



exports.getTicket = async (req, res) => {
    const tickets = await Ticket.find({
        userId: req.currentUser.id,
    }).populate('event');

    res.send(tickets);
}

exports.getUserTicket = async (req, res) => {
    const ticket = await Ticket.find({ userId: req.params.userId, }).populate('event');

    res.send(ticket);
}

exports.createTicket = async (req, res) => {

    const { eventId } = req.body;

    // Find the ticket the user is trying to order in the database
    const event = await Event.findById(eventId);
    if (!event) {
        throw new NotFoundError();
        
    }

    const user = await User.findById(req.currentUser.id);
    // Build the order and save it to the database
    const ticket = new Ticket({
        userId: req.currentUser.id,
        status: OrderStatus.Created,
        event,
    });
    await ticket.save();

    const message = `Hi, ${user.name}. You have successfully reserved a  ticket for ${event.title} which is scheduled for ${event.date} by exactly ${event.time}`;
    sendEmail({
        email: req.currentUser.email,
        subject: 'Ticket Reservation',
        message,
    });

    res.status(201).send(ticket);
}
exports.cancelTicket = async (req, res) => {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId).populate('ticket');

    if (!ticket) {
        throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser.id) {
        throw new NotAuthorizedError();
    }
    ticket.status = OrderStatus.Cancelled;
    await ticket.save();


    res.status(201).send(ticket);
}