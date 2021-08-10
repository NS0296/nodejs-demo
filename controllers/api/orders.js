const Order = require("../../models/order");
const User = require("../../models/user");

exports.postOrder = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        const userCart = await user.getCart();
        res.send({ test: userCart });
    } catch (err) {
        res.send(err);
    }
};
