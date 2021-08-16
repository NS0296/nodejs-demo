CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_cart_item`(
	_user_id INT,
    _product_id INT,
    _quantity INT
)
BEGIN
	INSERT INTO cart_item
	SELECT
		c.id,
		p.id,
		_quantity
	FROM
		user u
	JOIN
		cart c ON u.id = c.user_id
	JOIN
		product p ON p.id = _product_id
	WHERE
		u.id = _user_id;
END