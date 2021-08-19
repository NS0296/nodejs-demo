CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cart_summary`(
	_user_id INT
)
BEGIN
	SELECT 
		SUM(ci.quantity) AS items_count,
		SUM(ci.quantity * p.price) AS total_price
	FROM
		user u
			JOIN
		cart c ON u.id = c.user_id
			JOIN
		cart_item ci ON c.id = ci.cart_id
			JOIN
		product p ON ci.product_id = p.id
	WHERE
		u.id = _user_id;
END