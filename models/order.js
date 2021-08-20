const pool = require("../util/database").promisePool;

class Order {
    static pool = pool;

    get pool() {
        return User.pool;
    }

    static createOrder(data = {}) {
        // data => { userId, paymentMethod, shippingAddress}
        return this.pool.execute("call create_order(?, ?, ?)", [
            userId,
            paymentMethod,
            shippingAddress,
        ]);
    }
}

module.exports = Order;
