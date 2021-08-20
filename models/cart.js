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

    static findCartItems(filters = {}) {
        return this.pool.execute("call get_cart_items(?)", [filters.userId || NULL]);
    }

    static insertCartItem(filters = {}) {
        return this.pool.execute("call insert_cart_item(?, ?, ?)", [
            filters.userId,
            filters.productId,
            filters.quantity,
        ]);
    }

    static deleteCartItem(filters = {}) {
        return this.pool.execute("call delete_cart_item(?, ?)", [
            filters.userId,
            filters.itemId,
        ]);
    }

    save() {
        return this.pool.execute("call insert_cart(?)", [this.user_id]);
    }

    static deleteByPK(id = 0) {
        return this.pool.execute("call delete_cart_by_id(?)", [id]);
    }

    static getCartSummary(filters = {}) {
        //get cart summary(total_price, items_count) by user id
        return this.pool.execute("CALL get_cart_summary(?)", [filters.userId || 0]);
    }
}

module.exports = Cart;
