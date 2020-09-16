const { body } = require('express-validator');
const { validateRequest, currentUser } = require('@bolarin/common');

const express = require('express');

const {
    signUp, signIn, signOut
} = require('../controllers/auth/auth');

const router = express.Router();

router.get('/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});


router.post('/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest, signUp);


router.post('/login',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest, signIn);

router.post('/logout', signOut);




module.exports = router;