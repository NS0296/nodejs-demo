CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_user`(
	id INT,
    username varchar(64),
    email varchar(64),
    `password` char(60),
    phone varchar(11),
    home_address varchar(64)
)
BEGIN
	IF id <= 0 THEN
		INSERT INTO user (username, email, `password`, phone, home_address)
        VALUES (username, email, `password`, phone, home_address);
	ELSE
		UPDATE user u
        SET
			u.username = IFNULL(username, u.username),
			u.email = IFNULL(email, u.email),
			u.`password` = IFNULL(`password`, u.`password`),
			u.phone = IFNULL(phone, u.phone),
			u.home_address = IFNULL(home_address, u.home_address)
		WHERE
			u.id = id AND (username IS NOT NULL OR
				email IS NOT NULL OR
                `password` IS NOT NULL OR
                phone IS NOT NULL OR
                home_address IS NOT NULL);
	END IF;
END