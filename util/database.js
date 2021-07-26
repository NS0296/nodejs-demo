const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-demo", "root", "***REMOVED***", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => {
        console.log(err);
    });
