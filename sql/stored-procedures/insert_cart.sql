CREATE PROCEDURE `insert_cart` (
	_user_id INT
)
BEGIN
	INSERT INTO cart (user_id)
    VALUE (_user_id);
END
