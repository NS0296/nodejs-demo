const Cart = require("../../models/cart");

exports.getCartItems = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [cartItems] = await Cart.findCartItems({ userId: userId });
        res.send(cartItems);
    } catch (err) {
        res.send(err);
    }
};

exports.postCartItem = async (req, res) => {
    const userId = req.session.userId;
    const productId = req.params.productId;
    try {
        await Cart.insertCartItem({ userId: userId, productId: productId, quantity: 1 });
        res.send({ message: "Item added" });
    } catch (err) {
        res.send(err);
    }
};

exports.deleteCartItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        await Cart.deleteCartItem({ userId: userId, itemId: itemId });
        res.send({ message: "Item removed" });
    } catch (err) {
        res.send({ message: "error" });
    }
};

exports.getCartSummary = async (req, res) => {
    //gets total price and number of items in user cart
    const userId = req.params.userId;
    try {
        res.send(await Cart.getCartSummary({ id: userId }));
    } catch (err) {
        res.send(err);
    }
};
