CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_product`(
	_id INT,
    _title VARCHAR(64),
    _category_name VARCHAR(64),
    _price INT,
    _stock INT
)
BEGIN
	IF _id <= 0 THEN
		INSERT INTO product (title, category_name, price, stock)
        VALUES (_title, _category_name, _price, _stock);
	ELSE
		UPDATE product
        SET
			title = IFNULL(_title, title),
			category_name = IFNULL(_category_name, category_name),
			price = IFNULL(_price, price),
			stock = IFNULL(_stock, stock)
		WHERE
			id = _id AND (
				title IS NOT NULL OR
				category_name IS NOT NULL OR
                price IS NOT NULL OR
                stock IS NOT NULL);
	END IF;
END