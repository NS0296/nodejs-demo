const pool = require("../util/database").promisePool;

class Cart {
    constructor(id, user_id) {
        this.user_id = user_id;
    }

    static pool = pool;

    get pool() {
        return Cart.pool;
    }

    static findOne(filters = {}) {
        return this.pool.execute("call get_one_cart(?, ?)", [
            filters.id || NULL,
            filters.userId || NULL,
        ]);
    }

    static findCartItems(filter = {}) {
        return this.pool.execute("call get_cart_items(?)", [filters.userId || NULL]);
    }

    static insertCartItem(filters = {}) {
        return this.pool.execute("call insert_cart_item(?, ?, ?)", [
            filters.userId,
            filters.productId,
            filters.quantity,
        ]);
    }

    save() {
        return this.pool.execute("call insert_cart(?)", [this.user_id]);
    }

    static deleteByPK(id = 0) {
        return this.pool.execute("call delete_cart_by_id(?)", [id]);
    }
}

module.exports = Cart;
