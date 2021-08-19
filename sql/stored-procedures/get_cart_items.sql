CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cart_items`(
	_user_id INT
)
BEGIN
	SELECT
		p.id,
		p.title,
        p.category_name,
        p.price
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