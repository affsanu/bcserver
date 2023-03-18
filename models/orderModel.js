const mongoose = require('mongoose');
const { Schema } = mongoose;

const date = new Date();
const getDate = date.getUTCDate;

const UserSchema = new Schema({
    userPaymentNumber: {
        type: String,
        required: true,
    },
    tranxId: {
        type: String,
        required: true,
        unique: true
    },
    userWallet: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },

    payment: {
        type: String,
        required: true,
    },
    dollar: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },

    orderID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'awaiting', 'rejected', 'success'],
        default: 'pending',
    },

}, { timestamps: getDate });

const Order = mongoose.model('Order', UserSchema);

module.exports = Order;