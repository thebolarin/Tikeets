/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');



const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,

        },
        price: {
            type: Number,
            required: true,
        }

    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    },

);
eventSchema.set('versionKey', 'version');
eventSchema.plugin(updateIfCurrentPlugin);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;