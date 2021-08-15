CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products`(
	_id INT,
    _title VARCHAR(64),
    _category_name VARCHAR(64),
    _price INT,
    _stock INT
)
BEGIN
	SELECT * FROM `nodejs-demo-new`.product
    WHERE id = ifnull(_id, id) 
		AND title = ifnull(_title, title)
        AND category_name = ifnull(_category_name, category_name)
		AND price = ifnull(_price, price)
        AND stock = ifnull(_stock, stock)
    ORDER BY id DESC;
END