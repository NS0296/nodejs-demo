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
            allItems: allItems,
            pageTitle: "Shop",
            path: "/",
        });
    } catch (err) {
        console.log(err);
    }
};
