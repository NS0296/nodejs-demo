const pool = require("../util/database").promisePool;

class Product {
    constructor(title, categoryName, price, stock) {
        this.title = title;
        this.categoryName = categoryName;
        this.price = price;
        this.stock = stock;
    }

    static pool = pool;

    get pool() {
        return Product.pool;
    }

    static findAll(filters) {
        if (filters === undefined) filters = {}; //prevent error incase no arg. is passed
        return this.pool.execute("CALL get_all_products(?, ?, ?, ?, ?);", [
            filters.id || null,
            filters.title || null,
            filters.categoryName || null,
            filters.price || null,
            filters.stock || null,
        ]);
    }

    static deleteByPK(id = 0) {
        return this.pool.execute("call delete_product_by_id(?)", [id]);
    }

    static updateByPK(id, newDataObj) {
        return this.pool.execute("call insert_or_update_product(?, ?, ?, ?, ?);", [
            id,
            newDataObj.title || null,
            newDataObj.categoryName || null,
            newDataObj.price || null,
            newDataObj.stock || null,
        ]);
    }

    save() {
        return this.pool.execute("call insert_or_update_product(0, ?, ?, ?, ?)", [
            this.title,
            this.categoryName,
            this.price,
            this.stock,
        ]);
    }
}

module.exports = Product;
