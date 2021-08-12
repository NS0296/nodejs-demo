// const User = require("../../models/user");
// const Item = require("../../models/item");

exports.createCart = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        // const user = await User.findOne({ where: { id: userId } }); //current user
        // const isCartExist = await user.getCart();
        if (isCartExist === null) {
            // user.createCart();
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
        // const user = await User.findOne({ where: { id: userId } });
        // const userCart = await user.getCart();
        // const cartItems = await userCart.getItems();
        res.send(cartItems);
    } catch (err) {
        res.send(err);
    }
};

exports.postCartItem = async (req, res, next) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        // const user = await User.findOne({ where: { id: userId } });
        // const userCart = await user.getCart();
        // const addItem = await Item.findOne({ where: { id: itemId } });
        // userCart.addItem(addItem);
        res.send({ message: "Item added" });
    } catch (err) {
        res.send(err);
    }
};

exports.deleteCartItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        // const user = await User.findOne({ where: { id: userId } });
        // const userCart = await user.getCart();
        // const removedItem = await userCart.getItems({ where: { id: itemId } });
        // await userCart.removeItem(removedItem[0]);
        // const item = items[0];
        // console.log("single", item);
        // await item.cartItem.set();
        res.send({ message: "Item removed" });
    } catch (err) {
        res.send({ message: "error" });
    }
};

exports.getCartSummary = async (req, res) => {
    //gets total price and number of items in user cart
    const userId = req.params.userId;
    try {
        // const user = await User.findOne({ where: { id: userId } });
        // const userCart = await user.getCart();
        // const itemsCount = await userCart.countItems();
        if (itemsCount === 0) {
            throw new Error({ message: "No items in Cart" });
        }
        // const itemsPrice = await userCart.getItems({ attributes: ["price"] });
        let totalPrice = 0;
        itemsPrice.forEach(item => {
            totalPrice = totalPrice + item.price;
        });
        res.send({ itemsCount: itemsCount, totalPrice: totalPrice });
    } catch (err) {
        res.send(err);
    }
};
