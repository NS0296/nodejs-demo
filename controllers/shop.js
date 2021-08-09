exports.getAllShop = (req, res, next) => {
    res.render("shop.ejs", {
        isAuth: req.session.isAuth,
        pageTitle: "Home",
        path: "/",
    });
};
