// const Order = require("../../models/order");
// const User = require("../../models/user");
const fetch = require("node-fetch");

exports.postOrder = async (req, res) => {
    try {
        const { paymentMethod, shippingAddress } = req.body;
        const userId = req.params.userId;
        const fetchRes = await fetch(`http://localhost:3000/api/carts/summary/${userId}`);
        const cartSummary = await fetchRes.json();
        // const user = await User.findOne({ where: { id: userId } });
        // const userCart = await user.getCart();
        // const userCartItems = await userCart.getItems();
        // const newOrder = await user.createOrder({
        //     date: Date.now(),
        //     paymentMethod: paymentMethod,
        //     totalPrice: cartSummary.totalPrice,
        //     shippingAddress: shippingAddress,
        // });
        // newOrder.setItems(userCartItems);
        // userCart.setItems(null);
        res.send(newOrder);
    } catch (err) {
        res.send(err);
    }
};
