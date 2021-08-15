CREATE DEFINER=`root`@`localhost` PROCEDURE `get_one_cart`(
	_id INT,
    _user_id INT
)
BEGIN
	SELECT * FROM cart
    WHERE id = ifnull(_id, id) AND user_id = ifnull(_user_id, user_id) 
    AND (_id IS NOT NULL OR _user_id IS NOT NULL);
END