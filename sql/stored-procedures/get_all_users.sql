CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_users`(
	_id INT,
    _username VARCHAR(64),
    _email VARCHAR(64),
    _phone VARCHAR(11),
    _home_address VARCHAR(64)
)
BEGIN
	SELECT * FROM `nodejs-demo-new`.user
    WHERE id = ifnull(_id, id) 
		AND username = ifnull(_username, username)
        AND email = ifnull(_email, email)
		AND phone = ifnull(_phone, phone)
        AND home_address = ifnull(_home_address, home_address)
    ORDER BY id DESC;
END