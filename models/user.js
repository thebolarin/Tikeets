/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { toHash } = require('../utils/passwordManager');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
  
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});


const User = mongoose.model('User', userSchema);

module.exports = User;