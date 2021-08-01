module.exports = (req, res, next) => {
    res.render("home.ejs", {
        isAuth: req.session.isAuth,
        pageTitle: "Home",
        path: "/",
    });
};
