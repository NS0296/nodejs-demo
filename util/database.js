const Sequelize = require("sequelize");
const mongoose = require("mongoose");

const sequelize = new Sequelize("node-demo", "root", "***REMOVED***", {
    host: "localhost",
    dialect: "mysql",
});

const mongoUri =
    "mongodb+srv://pro:dMIiXtqPD2EKjQ8j@nodejs-demo.v9yvf.mongodb.net/authentication?retryWrites=true&w=majority";
const connectMongoose = () => {
    return mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};

module.exports.sequelize = sequelize;
module.exports.mongoose = connectMongoose;
module.exports.mongoUri = mongoUri;
