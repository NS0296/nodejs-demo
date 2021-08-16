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
        const fetchRes = await fetch("http://localhost:3000/api/products/findall");
        const [allProducts] = await fetchRes.json();
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
        const reqUrl = `http://localhost:3000/api/carts/${userId}/findallitems`;
        const fetchRes = await fetch(reqUrl);
        const [cartItems] = await fetchRes.json();
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
    try {
        const reqUrl = `http://localhost:3000/api/carts/summary/${req.session.userId}`;
        const fetchRes = await fetch(reqUrl);
        const cartSummary = await fetchRes.json();
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
