module.exports = (req, res, next) => {
    res.status(404).render("404.ejs", { pageTitle: "Not Found" });
};
