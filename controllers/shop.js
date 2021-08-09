const fetch = require("node-fetch");

exports.getAllShop = async (req, res, next) => {
    try {
        const fetchRes = await fetch("http://localhost:3000/api/items/all");
        const allItems = await fetchRes.json();
        res.render("shop/index.ejs", {
            isAuth: req.session.isAuth,
            allItems: allItems,
            pageTitle: "Home",
            path: "/",
        });
    } catch (err) {
        console.log(err);
    }
};
