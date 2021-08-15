CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product_by_id`(
	_id INT
)
BEGIN
	DELETE FROM product
    WHERE id = _id;
END