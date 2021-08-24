const Lookup = require("../../models/lookup");

exports.findPaymentMethods = async (req, res) => {
    try {
        const paymentMehtods = await lookup.findPaymentMethods();
        res.send(paymentMehtods);
    } catch (err) {
        res.send(err);
    }
};
