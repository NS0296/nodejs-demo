const Order = require("../../models/order");

exports.postCreateOrder = async (req, res) => {
    const { paymentMethod, shippingAddress } = req.body;
    try {
        await Order.createOrder({
            userId: req.params.userId,
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
        });
        res.send({ message: "success" });
    } catch (err) {
        res.send(err);
    }
};
