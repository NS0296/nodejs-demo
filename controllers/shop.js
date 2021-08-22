//contains all shop related pages
//e.g. products index

const Product = require("../models/product");
const Cart = require("../models/cart");

//used for guest user
exports.getWelcome = (req, res) => {
    res.render("welcome.ejs", {
        pageTitle: "Home",
        path: "/",
        isAuth: req.session.isAuth,
    });
};

//used for logged in user
exports.getIndex = async (req, res) => {
    try {
        [[allProducts]] = await Product.findAll();
        res.render("shop/index.ejs", {
            pageTitle: "Shop",
            path: "/",
            isAuth: req.session.isAuth,
            allProducts: allProducts,
        });
    } catch (err) {
        console.log(err);
    }
};

//to view cart items
exports.getCart = async (req, res) => {
    const userId = req.session.userId;
    try {
        [[cartItems]] = await Cart.findCartItems({ userId: userId });
        res.render("shop/cart.ejs", {
            pageTitle: "Cart",
            path: "/cart",
            isAuth: req.session.isAuth,
            userId: userId, //used to perform operations later on cart
            cartItems: cartItems,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCheckout = async (req, res) => {
    const userId = req.session.userId;
    try {
        const [[[cartSummary]]] = await Cart.getCartSummary({ userId: userId });
        res.render("shop/checkout.ejs", {
            pageTitle: "Checkout",
            path: "/cart/checkout",
            isAuth: req.session.isAuth,
            cartSummary: cartSummary,
            userId: userId,
        });
    } catch (err) {
        console.log(err);
    }
};
