exports.isAuth = (req, res, next) => {
    //checks if user is auth. for requests that need this permission
    if (req.session.isAuth) {
        next();
    } else {
        console.log("You are not logged in yet!");
        res.redirect("/");
    }
};

exports.isNotAuth = (req, res, next) => {
    //opposite of isAuth middleware function
    if (!req.session.isAuth) {
        next();
    } else {
        console.log("You are already logged in!");
        res.redirect("/");
    }
};
