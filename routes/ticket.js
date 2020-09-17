const { body } = require('express-validator');
const { requireAuth, validateRequest,currentUser } = require('@bolarin/common');
const express = require('express');
const mongoose = require('mongoose');
const { authorizeAdmin } = require('../middleware/role');

const {
    createTicket, cancelTicket, getTicket, getUserTicket
} = require('../controllers/ticket/index');

const router = express.Router();

router.get('/user/tickets',currentUser,requireAuth, getTicket);

router.get('/:userId/tickets',currentUser,requireAuth,authorizeAdmin, getUserTicket);

router.post('/ticket',currentUser,
    requireAuth,
    [
        body('eventId')
            .not()
            .isEmpty()
            .custom((input) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('EventId must be provided'),
       

    ],
    validateRequest, createTicket);




router.patch('/events/ticket/:ticketId',currentUser,
requireAuth,  cancelTicket);




module.exports = router;