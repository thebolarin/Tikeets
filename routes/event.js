const express = require('express');
const { body } = require('express-validator');
const { requireAuth, validateRequest , currentUser } = require('@bolarin/common');
const { authorizeAdmin } = require('../middleware/role');


const {
    createEvent, updateEvent, deleteEvent, getEvents
} = require('../controllers/events/index');

const router = express.Router();


router.get('/events',getEvents);


router.post('/events',currentUser,
   requireAuth,authorizeAdmin,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('location').not().isEmpty().withMessage('Event venue is required'),
        body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0'),
        body('date').not().isEmpty().withMessage('Date is required'),
        body('time').not().isEmpty().withMessage('Time is required'),
    ],
    validateRequest, createEvent);

    
router.put('/events/:eventId',currentUser,authorizeAdmin,
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('location').not().isEmpty().withMessage('Event venue is required'),
        body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0'),
        body('date').not().isEmpty().withMessage('Date is required'),
        body('time').not().isEmpty().withMessage('Time is required'),
    ],
    validateRequest, updateEvent);

router.post('/events/:eventId', requireAuth,currentUser,authorizeAdmin, deleteEvent);




module.exports = router;