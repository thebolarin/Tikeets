/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('@bolarin/common');
const { compare } = require('../../utils/passwordManager');
const User = require('../../models/user');


exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = new User({ name, email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
};

exports.signIn = async(req,res) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
};

exports.signOut = (req, res) => {
  req.session = null;

  res.send({});
};
