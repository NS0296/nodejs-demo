CREATE DEFINER=`root`@`localhost` FUNCTION `is_user_exist`(
	_id INT,
    _email VARCHAR(64)
) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE result INT;
    SET result = (SELECT count(*) FROM `user` u
	WHERE u.id = ifnull(_id, u.id) AND u.email = ifnull(_email, u.email));
	RETURN result;
END