const sequelize = require("./database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//store
module.exports = new SequelizeStore({
    db: sequelize,
});
