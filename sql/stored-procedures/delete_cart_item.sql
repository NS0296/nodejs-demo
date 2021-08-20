CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_cart_item`(
	_user_id INT,
    _item_id INT
)
BEGIN
	DELETE FROM cart_item ci
	WHERE ci.cart_id = (SELECT
		c.id
	FROM
		user u
	JOIN
		cart c ON u.id = c.user_id
	WHERE
		u.id = _user_id)
	AND ci.product_id = _item_id;
END