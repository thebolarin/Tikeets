const { body } = require('express-validator');
const { requireAuth, validateRequest,currentUser } = require('@bolarin/common');
const express = require('express');
const mongoose = require('mongoose');

const {
    createTicket, cancelTicket, getTicket, getUserTicket
} = require('../controllers/ticket/index');

const router = express.Router();

router.get('/user/tickets',currentUser, getTicket);

router.get('/:userId/tickets', getUserTicket);

router.post('/tickets',currentUser,
    requireAuth,
    [
        body('eventId')
            .not()
            .isEmpty()
            .custom((input) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('EventId must be provided'),
       

    ],
    validateRequest, createTicket);




router.patch('/ticket/:ticketId',currentUser,
requireAuth,  cancelTicket);




module.exports = router;