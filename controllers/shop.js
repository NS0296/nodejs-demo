const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getWelcome = (req, res) => {
    res.render("welcome.ejs", {
        isAuth: req.session.isAuth,
        pageTitle: "Home",
        path: "/",
    });
};

exports.getIndex = async (req, res, next) => {
    try {
        [[allProducts]] = await Product.findAll();
        res.render("shop/index.ejs", {
            isAuth: req.session.isAuth,
            userId: req.session.userId, //gets id of logged in user
            allProducts: allProducts,
            pageTitle: "Shop",
            path: "/",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCart = async (req, res) => {
    const userId = req.session.userId;
    try {
        [[cartItems]] = await Cart.findCartItems({ userId: userId });
        res.render("shop/cart.ejs", {
            isAuth: req.session.isAuth,
            userId: req.session.userId, //gets id of logged in user
            cartProducts: cartItems,
            pageTitle: "Cart",
            path: "/cart",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCheckout = async (req, res) => {
    const userId = req.session.userId;
    try {
        const [[[cartSummary]]] = await Cart.getCartSummary({ id: userId });
        res.render("shop/checkout.ejs", {
            isAuth: req.session.isAuth,
            cartSummary: cartSummary,
            pageTitle: "Checkout",
            path: "/cart/checkout",
        });
    } catch (err) {
        console.log(err);
    }
};
