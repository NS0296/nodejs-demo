CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user_by_id`(
	id INT
)
BEGIN
	DELETE FROM user u
    WHERE u.id = id;
END