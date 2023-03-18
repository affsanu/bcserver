const Order = require('../models/orderModel');
const {v4: uuidv4} = require('uuid');

const CreateOrder = async (req, res) => {
    const { userPaymentNumber, tranxId, userWallet, mobile, payment, dollar, amount, rate, total, orderID } = req.body;
    if (!userPaymentNumber || !tranxId || !userWallet || !mobile) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const oldTranx = await Order.findOne({ tranxId });
        if (oldTranx) {
            return res.status(400).json({ error: "Transaction ID already in used!" });
        }
    
         const transactionID = uuidv4();
        await Order.create({
            userPaymentNumber, tranxId, userWallet, mobile, payment, dollar, amount, rate, total, orderID: transactionID
        });

        res.status(200).json({ message: "Order created success!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = CreateOrder;