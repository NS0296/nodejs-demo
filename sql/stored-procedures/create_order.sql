CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order`(
	_user_id INT,
    _payment_method_id INT,
    _shipping_address varchar(64)
)
BEGIN
	-- insert a new order
	INSERT INTO `order` (user_id, payment_method_id, shipping_address)
		VALUES (_user_id, _payment_method_id, _shipping_address);
	-- insert the cart items into the order_items
    INSERT INTO order_item (order_id, product_id, quantity)
		SELECT
			last_insert_id(),
			ci.product_id,
			ci.quantity
		FROM
			user u
		JOIN
			cart c ON u.id = c.user_id
		JOIN
			cart_item ci ON c.id = ci.cart_id
		WHERE
			u.id = _user_id;
	-- delete cart items
    SELECT delete_cart_items(_user_id);
END