const Product = require("../../models/product");

exports.findAll = (req, res, next) => {
    Product.findAll()
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => res.send(err));
};

exports.deleteItem = async (req, res, next) => {
    try {
        // const itemId = parseInt(req.params.itemId);
        // const deleteRow = await Item.destroy({ where: { id: itemId } });
        res.send({ status: "done" });
    } catch (err) {
        res.send(err);
    }
};

exports.createItem = async (req, res, next) => {
    const { name, categoryName, manufacture, price, stockAvailable } = req.body;
    try {
        // const createItem = await Item.create({
        //     name: name,
        //     categoryName: categoryName,
        //     manufacture: manufacture,
        //     price: price,
        //     stockAvailable,
        //     dateFirstAvailable: Date.now(),
        // });
        res.send({ message: "Created Item" });
    } catch (err) {
        res.send(err);
    }
};

exports.updateItem = async (req, res, next) => {
    const {
        id,
        name,
        categoryName,
        manufacture,
        price,
        stockAvailable,
        dateFirstAvailable,
    } = req.body;
    try {
        const itemId = parseInt(req.params.itemId);
        // const updateItem = await Item.update(
        //     {
        //         id: id,
        //         name: name,
        //         categoryName: categoryName,
        //         manufacture: manufacture,
        //         price: price,
        //         stockAvailable: stockAvailable,
        //         dateFirstAvailable: dateFirstAvailable,
        //     },
        //     {
        //         where: { id: itemId },
        //     }
        // );
        if (updateItem[0] === 0) {
            throw new Error("Item does not exit");
        }
        res.send({ status: "done" });
    } catch (err) {
        res.send(err);
    }
};
