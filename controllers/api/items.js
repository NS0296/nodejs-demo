const Item = require("../../models/item.js");

exports.allItems = async (req, res, next) => {
    try {
        const allItems = await Item.findAll({
            attributes: [
                "id",
                "name",
                "categoryName",
                "manufacture",
                "price",
                "stockAvailable",
                "dateFirstAvailable",
            ],
        });
        res.send(allItems);
    } catch (err) {
        res.send(err);
    }
};

exports.deleteItem = async (req, res, next) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const deleteRow = await Item.destroy({ where: { id: itemId } });
        res.send({ status: "done" });
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
        const updateItem = await Item.update(
            {
                id: id,
                name: name,
                categoryName: categoryName,
                manufacture: manufacture,
                price: price,
                stockAvailable: stockAvailable,
                dateFirstAvailable: dateFirstAvailable,
            },
            {
                where: { id: itemId },
            }
        );
        if (updateItem[0] === 0) {
            throw new Error("Item does not exit");
        }
        res.send({ status: "done" });
    } catch (err) {
        res.send(err);
    }
};
