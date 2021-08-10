const fetch = require("node-fetch");

exports.getWelcome = (req, res) => {
    res.render("welcome.ejs", {
        isAuth: req.session.isAuth,
        pageTitle: "Home",
        path: "/",
    });
};

exports.getIndex = async (req, res, next) => {
    try {
        const fetchRes = await fetch("http://localhost:3000/api/items/all");
        const allItems = await fetchRes.json();
        res.render("shop/index.ejs", {
            isAuth: req.session.isAuth,
            userId: req.session.userId, //gets id of logged in user
            allItems: allItems,
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
        const reqUrl = `http://localhost:3000/api/carts/allItems/${userId}`;
        const fetchRes = await fetch(reqUrl);
        const cartItems = await fetchRes.json();
        console.log(cartItems);
        res.render("shop/cart.ejs", {
            isAuth: req.session.isAuth,
            userId: req.session.userId, //gets id of logged in user
            cartItems: cartItems,
            pageTitle: "Cart",
            path: "/cart",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCheckout = (req, res) => {
    res.render("shop/checkout.ejs", {
        isAuth: req.session.isAuth,
        pageTitle: "Checkout",
        path: "/cart/checkout",
    });
};
