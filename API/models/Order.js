const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    client: {
        type: String,
        ref: 'User'
    },
    order: {
        type: Array
    },
    price: {
        type: Number
    },
    date: {
        type: Date
    },
    status: {
        type: String
    }
});

module.exports = model('Order', OrderSchema);
