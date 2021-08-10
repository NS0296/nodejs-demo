const User = require("../../models/user");
const Item = require("../../models/item");

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

exports.getCart = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ where: { id: userId } });
        const userCart = await user.getCart();
        const cartItems = await userCart.getItems();
        res.send(cartItems);
    } catch (err) {
        res.send(err);
    }
};

exports.postCartItem = async (req, res, next) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        const user = await User.findOne({ where: { id: userId } });
        const userCart = await user.getCart();
        const addItem = await Item.findOne({ where: { id: itemId } });
        userCart.addItem(addItem);
        res.send({ message: "Item added" });
    } catch (err) {
        res.send(err);
    }
};

exports.deleteCartItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        const user = await User.findOne({ where: { id: userId } });
        const userCart = await user.getCart();
        const item = userCart.getItems({ where: { id: itemId } });
        item.cartItem.destroy();
        res.send({ message: "Item removed" });
    } catch (err) {
        res.send(err);
    }
};
