CREATE DEFINER=`root`@`localhost` FUNCTION `delete_cart_items`(
	_user_id INT
) RETURNS int
    DETERMINISTIC
BEGIN
	DELETE
		ci
	FROM
		user u
	JOIN
		cart c ON u.id = c.user_id
	JOIN
		cart_item ci ON c.id = ci.cart_id
	WHERE
		u.id = _user_id;
	RETURN 1;
END