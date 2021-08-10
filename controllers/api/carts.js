const User = require("../../models/user");
const Cart = require("../../models/cart");

exports.createCart = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ where: { id: userId } }); //current user
        const isCartExist = await user.getCart();
        if (isCartExist === null) {
            user.createCart();
            res.send({ message: "cart created" });
        } else {
            res.send({ message: "user has cart already" });
        }
    } catch (err) {
        res.send(err);
    }
};
