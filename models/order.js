const pool = require("../util/database").promisePool;

class Order {
    static pool = pool;

    get pool() {
        return User.pool;
    }

    static createOrder(data = {}) {
        // data => { userId, paymentMethod, shippingAddress}
        return this.pool.execute("call create_order(?, ?, ?)", [
            data.userId,
            data.paymentMethod,
            data.shippingAddress,
        ]);
    }
}

module.exports = Order;
