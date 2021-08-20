const Order = require("../../models/order");

exports.postCreateOrder = async (req, res) => {
    const { payment_method, shipping_address } = req.body;
    try {
        Order.createOrder({
            userId: req.session.id,
            paymentMethod: 1,
            shippingAddress: shipping_address,
        });
        res.send(newOrder);
    } catch (err) {
        res.send(err);
    }
};
