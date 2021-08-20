const Order = require("../../models/order");

exports.postCreateOrder = async (req, res) => {
    const { payment_method, shipping_address } = req.body;
    try {
        await Order.createOrder({
            userId: req.params.userId,
            paymentMethod: 1,
            shippingAddress: shipping_address,
        });
        res.send({ message: "success" });
    } catch (err) {
        res.send(err);
    }
};
