-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: nodejs-demo-new
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,100),(2,322),(3,323);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (1,100,50),(2,5,1),(2,35,1),(2,120,2),(2,124,1);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `date_placed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shipping_address` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,323,2,'2021-08-20 18:05:15','some_address'),(2,323,2,'2021-08-24 13:04:16','El-Nabawy El-Mohendes, Al-Agouza'),(3,323,3,'2021-08-24 13:04:58','El-Nabawy El-Mohendes, Al-Agouza'),(4,323,3,'2021-08-24 13:33:38','El-Nabawy El-Mohendes, Al-Agouza');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,196,1),(1,197,1),(1,198,1),(1,199,1),(2,185,1),(2,196,1),(2,197,1),(2,198,1),(2,199,1),(3,184,1),(3,192,1),(4,196,1),(4,198,1);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (2,'mastercard'),(3,'stripe'),(4,'paypal'),(5,'cash on delivery');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `category_name` varchar(64) NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'Poppy Seed','Yogurt',8,22),(4,'Sour Puss - Tangerine','Dinners/Entrees',9,82),(5,'Lambcasing','Bread & Rolls',33,34),(6,'Fondant - Icing','Fresh',38,13),(7,'Chutney Sauce','Salty',23,82),(8,'Crackers - Graham','Snacks',35,39),(9,'Napkin Colour','Dinners/Entrees',39,75),(10,'Cake Circle, Paprus','Milk',22,18),(11,'Wine - White, Pinot Grigio','Juices/Drinks',50,97),(12,'Coconut - Shredded, Unsweet','Yogurt',44,27),(13,'Towel - Roll White','Cold',18,99),(14,'Pastry - Carrot Muffin - Mini','Juices/Drinks',13,90),(15,'Soup Campbells Beef With Veg','Yogurt',48,81),(16,'Mussels - Frozen','Ice Cream/Sherbet',12,64),(17,'Coconut - Whole','Salty',24,93),(18,'Jameson Irish Whiskey','Ice Cream/Sherbet',32,26),(19,'Cheese - Cheddar, Old White','Natural',20,53),(20,'Beef - Outside, Round','Yogurt',20,88),(21,'Bagel - Ched Chs Presliced','Natural',49,54),(22,'Cookie Dough - Peanut Butter','Carbonated',18,49),(23,'Pineapple - Regular','Soup',12,19),(24,'Cake Circle, Foil, Scallop','Natural',29,4),(25,'Pomello','Wine',24,88),(26,'Cookies - Englishbay Wht','Cheese',41,5),(27,'Compound - Raspberry','Cider',45,33),(28,'Mustard - Individual Pkg','Wine',10,70),(29,'Wine - Rosso Toscano Igt','Beer/Ale/Alcoholic',38,57),(30,'Capers - Ox Eye Daisy','Fresh',44,79),(31,'Creme De Menth - White','Yogurt',39,95),(32,'Tea - Earl Grey','Salty',47,63),(33,'Bread - Pullman, Sliced','Soup',46,67),(34,'Rice - Brown','Wine',23,66),(35,'Crab - Imitation Flakes','Cold',22,97),(36,'Danishes - Mini Cheese','Soup',17,85),(37,'Broom And Broom Rack White','Cereal',21,7),(38,'Tomato - Peeled Italian Canned','Salty',12,92),(39,'Pepper - Black, Whole','Wine',44,2),(40,'Tea - Honey Green Tea','Salty',20,13),(41,'Cheese - Provolone','Yogurt',29,50),(42,'Tabasco Sauce, 2 Oz','Milk',36,90),(43,'Artichokes - Knobless, White','Fz',25,55),(44,'Soup - Campbells, Minestrone','Wine',45,51),(45,'Spaghetti Squash','Cigarettes',34,13),(46,'Macaroons - Two Bite Choc','Cereal',40,67),(47,'Table Cloth 54x54 White','Milk',33,35),(48,'Eggroll','Beverages',13,95),(49,'Bandage - Fexible 1x3','Beer/Ale/Alcoholic',38,61),(50,'Rice Pilaf, Dry,package','Ice Cream/Sherbet',34,20),(51,'Fudge - Cream Fudge','Cold',26,66),(52,'Pie Filling - Apple','Natural',8,81),(53,'Beer - Steamwhistle','Cider',21,87),(54,'Olives - Black, Pitted','Natural',14,54),(55,'Kellogs Cereal In A Cup','Soup',47,57),(56,'Carbonated Water - Wildberry','Bottled Water',46,67),(57,'Grenadillo','Beverages',43,77),(58,'Bread - Multigrain','Carbonated',10,24),(59,'Bread - Hamburger Buns','Natural',38,52),(60,'Aspic - Clear','Juices/Drinks',39,79),(61,'Table Cloth 120 Round White','Milk',9,16),(62,'Yogurt - Peach, 175 Gr','Wine',28,0),(63,'Longos - Grilled Chicken With','Snacks',6,87),(64,'Olives - Kalamata','Cold',19,55),(65,'Mushroom - Porcini Frozen','Natural',18,0),(66,'Sauce - Roasted Red Pepper','Dinners/Entrees',35,88),(67,'Soup Campbells Beef With Veg','Fresh',29,32),(68,'Shrimp - Baby, Cold Water','Natural',18,61),(69,'Juice - Prune','Beer/Ale/Alcoholic',45,52),(70,'Pepper - Chillies, Crushed','Bottled Water',49,34),(71,'Melon - Watermelon Yellow','Bread & Rolls',32,55),(72,'Soup - Campbells, Beef Barley','Fresh',13,16),(73,'Pork Ham Prager','Bottled Water',9,19),(74,'Wine - Coteaux Du Tricastin Ac','Dinners/Entrees',40,61),(75,'Artichoke - Fresh','Natural',48,91),(76,'Vinegar - White Wine','Dinners/Entrees',15,82),(77,'Cardamon Seed / Pod','Yogurt',8,68),(78,'Anisette - Mcguiness','Milk',46,33),(79,'Table Cloth 54x72 Colour','Juices/Drinks',16,9),(80,'Fenngreek Seed','Bread & Rolls',46,52),(81,'Bagel - Everything Presliced','Juices/Drinks',46,26),(82,'Bread - Frozen Basket Variety','Beverages',38,55),(83,'Remy Red Berry Infusion','Salty',24,12),(84,'Pepper - Green','Yogurt',24,44),(85,'Salmon - Smoked, Sliced','Snacks',33,69),(86,'Amarula Cream','Ice Cream/Sherbet',31,22),(87,'Beef - Top Butt','Bottled Water',19,13),(88,'Tea - Jasmin Green','Fresh',30,69),(89,'Jameson Irish Whiskey','Fz',38,71),(90,'Energy Drink Red Bull','Cereal',23,92),(91,'Goulash Seasoning','Cheese',13,16),(92,'Sambuca - Opal Nera','Cold',41,51),(93,'Celery Root','Ice Cream/Sherbet',19,65),(94,'Pepper - Red Chili','Bread & Rolls',17,58),(95,'Bread - Granary Small Pull','Dinners/Entrees',15,20),(96,'Bread - Bagels, Mini','Wine',40,74),(97,'Bagel - Everything Presliced','Beverages',13,59),(98,'Chocolate - Milk Coating','Snacks',23,10),(99,'Aspic - Light','Cider',23,92),(100,'Slt - Individual Portions','Fresh',43,96),(101,'Petite Baguette','Fz',13,10),(102,'Wine - Vidal Icewine Magnotta','Juices/Drinks',47,54),(103,'Dates','Carbonated',39,50),(104,'Sausage - Andouille','Dinners/Entrees',37,77),(105,'Pear - Packum','Fz',21,7),(106,'Grapes - Black','Snacks',43,60),(107,'Pernod','Cigarettes',27,65),(108,'Beer - Molson Excel','Cold',34,71),(109,'The Pop Shoppe - Grape','Carbonated',6,52),(110,'Grenadine','Ice Cream/Sherbet',42,9),(111,'Mussels - Frozen','Milk',37,47),(112,'Broom - Angled','Fresh',16,75),(113,'Basil - Seedlings Cookstown','Wine',49,80),(114,'Pasta - Lasagna Noodle, Frozen','Juices/Drinks',12,97),(115,'Pork - Loin, Bone - In','Cheese',22,0),(116,'Syrup - Monin - Passion Fruit','Dinners/Entrees',43,6),(117,'Ecolab Silver Fusion','Bottled Water',7,27),(118,'Ecolab - Lime - A - Way 4/4 L','Cereal',50,7),(119,'Cheese Cloth No 60','Natural',44,71),(120,'French Pastry - Mini Chocolate','Dinners/Entrees',30,84),(121,'Scallops - 20/30','Juices/Drinks',21,31),(122,'Icecream Bar - Del Monte','Cheese',25,69),(123,'Bread - White, Sliced','Cold',48,54),(124,'Wine - Acient Coast Caberne','Yogurt',17,70),(125,'Cheese - Bakers Cream Cheese','Salty',36,65),(126,'Beer - Muskoka Cream Ale','Dinners/Entrees',49,25),(127,'Wine - Spumante Bambino White','Dinners/Entrees',18,30),(128,'Wine - Fat Bastard Merlot','Natural',28,2),(129,'White Fish - Filets','Cider',49,71),(130,'Cheese - Bocconcini','Cold',16,56),(131,'Appetizer - Shrimp Puff','Cold',11,75),(132,'Wine - White, Lindemans Bin 95','Cider',14,87),(133,'Trueblue - Blueberry','Milk',44,11),(134,'Bagel - Sesame Seed Presliced','Cheese',50,68),(135,'Pancetta','Milk',37,31),(136,'Tart - Pecan Butter Squares','Beer/Ale/Alcoholic',20,70),(137,'Coffee Caramel Biscotti','Dinners/Entrees',46,66),(138,'Bread - Hamburger Buns','Carbonated',50,43),(139,'Coffee - Beans, Whole','Dinners/Entrees',13,89),(140,'Triple Sec - Mcguinness','Milk',43,77),(141,'Beer - True North Lager','Fz',21,87),(142,'Oil - Cooking Spray','Carbonated',30,77),(143,'Pail For Lid 1537','Natural',49,21),(144,'Lettuce - Red Leaf','Wine',26,62),(145,'Sauce - Hoisin','Fz',26,54),(146,'Wine - Vineland Estate Semi - Dry','Cereal',10,43),(147,'Flour - Corn, Fine','Salty',38,96),(148,'Pasta - Detalini, White, Fresh','Cigarettes',23,68),(149,'Chicken Giblets','Dinners/Entrees',34,24),(150,'Soup Knorr Chili With Beans','Fz',30,22),(151,'Pork - Belly Fresh','Snacks',24,5),(152,'Chips - Miss Vickies','Carbonated',25,12),(153,'Southern Comfort','Juices/Drinks',40,39),(154,'Sole - Iqf','Soup',37,4),(155,'Bay Leaf','Bottled Water',16,4),(156,'Island Oasis - Banana Daiquiri','Dinners/Entrees',14,67),(159,'Chutney Sauce - Mango','Bottled Water',44,34),(160,'Syrup - Monin, Amaretta','Carbonated',45,14),(161,'Watercress','Salty',26,15),(162,'V8 Splash Strawberry Kiwi','Cider',11,37),(163,'Cheese - Grie Des Champ','Bread & Rolls',44,75),(164,'Scallops - 20/30','Carbonated',34,61),(165,'Cheese - Woolwich Goat, Log','Salty',36,42),(166,'Plasticknivesblack','Salty',21,55),(167,'Blueberries - Frozen','Beverages',40,54),(168,'Squid - U - 10 Thailand','Carbonated',40,12),(169,'Energy Drink - Franks Pineapple','Ice Cream/Sherbet',26,49),(170,'Clementine','Yogurt',17,82),(171,'Corn - Mini','Wine',22,97),(172,'Emulsifier','Wine',34,39),(173,'Chevril','Dinners/Entrees',43,63),(174,'Sugar - Sweet N Low, Individual','Soup',48,52),(175,'Beef - Top Butt','Bread & Rolls',11,59),(176,'Bananas','Fresh',35,46),(177,'Sugar - Sweet N Low, Individual','Yogurt',46,34),(178,'Oil - Sesame','Salty',25,71),(179,'Chicken - Thigh, Bone In','Cider',28,32),(180,'Cake - Night And Day Choclate','Beverages',44,46),(181,'Pork - Hock And Feet Attached','Beverages',35,38),(182,'Ice - Clear, 300 Lb For Carving','Cheese',8,73),(183,'Nougat - Paste / Cream','Wine',14,67),(184,'Veal Inside - Provimi','Fresh',28,28),(185,'Pimento - Canned','Ice Cream/Sherbet',34,63),(187,'Sprouts - Bean','Cereal',26,17),(188,'Nestea - Ice Tea, Diet','Yogurt',17,60),(189,'Cheese - Cheddar, Mild','Snacks',20,11),(190,'Bread - Rolls, Rye','Cheese',32,23),(191,'Langers - Cranberry Cocktail','Ice Cream/Sherbet',7,37),(192,'Pepper - Cubanelle','Soup',41,27),(193,'Veal - Inside Round / Top, Lean','Cereal',8,39),(194,'Towels - Paper / Kraft','Soup',46,33),(195,'Ezy Change Mophandle','Fz',15,94),(196,'Carbonated Water - White Grape','Beverages',40,56),(197,'Sherry - Dry','Bread & Rolls',6,82),(198,'Fireball Whisky','Soup',19,5),(199,'pen','stationery',20,84);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_token`
--

DROP TABLE IF EXISTS `reset_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` int NOT NULL,
  `token_expiration_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reset_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_token`
--

LOCK TABLES `reset_token` WRITE;
/*!40000 ALTER TABLE `reset_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('AH9Fix8SE_4lo8GYrsr74aNqlmnTRBH2','2021-08-25 11:40:16','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuth\":true,\"userId\":323}','2021-08-23 10:29:44','2021-08-24 11:40:16');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` char(60) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  `home_address` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (22,'cterzza','mkattenhorn3@yahoo.com','kjIF1bAgvOwr','3247115425','5 Vidon Crossing'),(23,'ldyett4','alambswood4@booking.com','sNfc6j','1816319277','11362 Jay Avenue'),(24,'rwinyard5','vdesseine5@google.es','7tDbUHzfueC','8068199767','9 Pankratz Street'),(25,'sbrade6','dhuburn6@marriott.com','w7wEBkyHn','7381419726','82 Thackeray Street'),(26,'bbrunsden7','twyness7@sogou.com','O77MqQdQSJQ','6807945578','519 Tomscot Park'),(27,'pethridge8','hsalmen8@hibu.com','FvahO1zRCAE','3387758531','27 Bay Drive'),(28,'mpeet9','fmooring9@infoseek.co.jp','bcdk6hg9','5195434259','87 Duke Parkway'),(29,'gbarnfathera','bgilberthorpea@census.gov','ffsnQ73nd','8938815726','8 Luster Center'),(30,'gperrycostb','ccasolb@1688.com','qrHjCS','7091494566','2 Mandrake Place'),(31,'lberrc','jjerdanc@ftc.gov','RT7dSQ4','2596460932','11 Bashford Circle'),(32,'imoriartyd','ksintond@virginia.edu','pRETXKDXne','7701113237','70 Southridge Circle'),(33,'tconene','okaaskoopere@un.org','EsrPwWXMEx','8753850336','3797 Sutteridge Parkway'),(34,'wvogtf','ogaliaf@gnu.org','Kpi8ROPD','6817883722','912 Pankratz Park'),(35,'ecrookallg','moglesg@stumbleupon.com','CHxlvwQ','7484320013','28478 Parkside Court'),(36,'pdiklesh','ahedauh@slate.com','sKUJRobvjAs','8519676724','6 Bellgrove Center'),(37,'syesipovi','cleithharveyi@youku.com','u8iaF9','4145781048','4 Monterey Avenue'),(38,'aferreiroj','bciccoloij@elegantthemes.com','jlC7gom8','9994077134','70 Gerald Parkway'),(39,'rhundalk','mlackneyk@answers.com','rxCmTSFSD','5033284096','1 Hovde Alley'),(40,'ipeeterl','ccomellinil@weibo.com','YoLN81Vr5','8788855141','79477 Northland Drive'),(41,'rdarcym','tmeekingm@msu.edu','tR7xYu3B','3581076227','7629 Burrows Drive'),(42,'hshoardn','cavonn@columbia.edu','YOCSDscj','7544139995','0 Nevada Court'),(43,'omcalindeno','mescheo@storify.com','KjBRc80Tk5u','9041033856','3080 Kingsford Road'),(44,'wboughtflowerp','bpopplestonep@virginia.edu','JVM9M2LniuO','6336036851','424 Norway Maple Junction'),(45,'rgaffneyq','otateq@bloomberg.com','qJBdyBSXj','3412994942','4 Warbler Street'),(46,'hschottr','croderickr@webmd.com','z4n12xtjfl','8195607984','97671 Stang Way'),(47,'bgoudards','hshepherdsons@ovh.net','gQCBKOKTik0H','2223902178','23 Atwood Terrace'),(48,'dwhitlandt','krainfortht@about.com','COOmtv11RQu','6467300938','4 Butterfield Hill'),(49,'nhabensu','rdelaneyu@usda.gov','PsXM3dKz','6608004529','0827 Lawn Plaza'),(50,'sspikinsv','sbalsilliev@live.com','gfrU4cKX3jVS','1407670084','16 Hoepker Center'),(51,'fruprichw','tiddiensw@disqus.com','mb8HWoyFB54H','3643901853','2311 Milwaukee Junction'),(52,'mprandinx','vvaskovx@thetimes.co.uk','WNi8blWMO','8202172126','580 Badeau Park'),(53,'mdimariay','mlongworthy@va.gov','uWbee5oDUr','6444028902','3 Barby Avenue'),(54,'kprydez','tollanderz@businesswire.com','pG6Dax9HJX','2976740978','3727 Nancy Parkway'),(55,'fspyer10','nagglio10@google.ru','bXTfZf0LW','7103020141','0 Oakridge Parkway'),(56,'mrojas11','lsandercock11@go.com','dPK6K86JhSY','4961542611','34311 Susan Circle'),(57,'lattwater12','nrentcome12@yale.edu','RA45MHL6XJ9e','5638551644','31663 1st Court'),(58,'krizzolo13','lbasten13@squidoo.com','UoxpLxQW','7134990281','44 Leroy Drive'),(59,'cphizackerly14','ykordas14@constantcontact.com','ZXvAfZ','7559135825','4 Raven Plaza'),(60,'jocarran15','gjimmison15@nymag.com','MehjzyMzzu5X','5637335452','1 Fair Oaks Crossing'),(61,'dbaldree16','rfleischer16@oakley.com','20i3vRtQ','7812127238','9 Waxwing Park'),(62,'eadlard17','taspital17@goo.gl','8Tk9wc','1533721527','4627 Mesta Point'),(63,'awoolner18','aeborall18@nationalgeographic.com','aoceqM2WE','4046559067','2378 Bay Junction'),(64,'pboecke19','ebountiff19@123-reg.co.uk','IF8p7zZCp','8344166427','0 Moose Way'),(65,'kmaccole1a','lanwell1a@nytimes.com','rf0LoTmE','7083996690','932 Barby Plaza'),(66,'bhamner1b','lzannotelli1b@cyberchimps.com','TLWFcvea','2623577744','3 Carpenter Parkway'),(67,'cwardall1c','ecore1c@shinystat.com','55AYhboUP','2047434857','2 Moulton Avenue'),(68,'espini1d','lmarkson1d@mapy.cz','LcK6MM','2169099731','468 Fisk Pass'),(69,'bdenacamp1e','ispellessy1e@paypal.com','uA1BjIohJ','6681923410','4719 Kipling Crossing'),(70,'gwimlet1f','jnickoll1f@yahoo.com','6uXZEZYYb','7409473514','5 Straubel Alley'),(71,'boloughlin1g','dcarsberg1g@nifty.com','PlI1LY','5185169043','456 Bay Pass'),(72,'obenedek1h','nphilippet1h@reddit.com','Qp4eTpQSg','5257475429','4 Dahle Crossing'),(73,'bsimonutti1i','zleclaire1i@yahoo.co.jp','nETZwW','6166475494','52 Banding Plaza'),(74,'oraylton1j','jyarrow1j@princeton.edu','2DWvgKKQ2','1923712112','08 Carioca Park'),(75,'ckless1k','easkew1k@alibaba.com','WgocC6ZHPuOl','3381684347','4946 Butternut Terrace'),(76,'gioannou1l','ialdrich1l@blinklist.com','1lDNKcf02Fn','1673742833','46909 Springview Lane'),(77,'stimmins1m','mtinklin1m@wp.com','4ze4WpmseVBy','3813916435','228 Commercial Drive'),(78,'rdiehn1n','asuch1n@mozilla.com','JUhcnr','5749335016','542 Clyde Gallagher Lane'),(79,'aoles1o','nguilder1o@jalbum.net','s9C7GUDo','9192860121','11683 Toban Drive'),(80,'bbrookson1p','bgillicuddy1p@dell.com','3apmjA','2502432295','68368 Forest Run Park'),(81,'afallows1q','mmcaneny1q@businessweek.com','uDd0BQkL3eK','2251557514','81881 Cottonwood Park'),(82,'uhenze1r','nramsby1r@addtoany.com','SgcuHJKzC2n','6556282125','96 Lawn Avenue'),(83,'sphant1s','never1s@webnode.com','w2oBG5','1439093385','920 Calypso Hill'),(84,'ajojic1t','cpoizer1t@purevolume.com','jVgO0kYf','9725991797','726 Fair Oaks Parkway'),(85,'abloyes1u','mfishburn1u@ca.gov','G3yTjsNQ951','8307829809','77 Tony Junction'),(86,'rpedron1v','cupwood1v@twitpic.com','yyJ5sO','9705397995','5063 Hintze Pass'),(87,'ataffarello1w','mstiling1w@disqus.com','6NyUEPsjOA','7122479477','063 Florence Street'),(88,'lthormann1x','awynrahame1x@vk.com','N867UL','3574070002','1 Straubel Place'),(89,'rgaitskell1y','blorimer1y@cargocollective.com','v82N1gQ','9868916143','1 Carberry Street'),(90,'cmoncaster1z','titzakson1z@ed.gov','9WP18AA','9678403261','32787 Grim Road'),(91,'lludovici20','ueaves20@bbb.org','hCkdFPz','7639001327','2269 Roxbury Parkway'),(92,'istallen21','nodams21@bandcamp.com','7FAs7q0B','6144670814','9 Doe Crossing Point'),(93,'tmackartan22','sworsham22@wikipedia.org','1C9mYFQFHosC','8359971421','46159 Maryland Center'),(94,'mseligson23','atollfree23@princeton.edu','sM7cZ5F','1954606084','676 Susan Alley'),(95,'lclewer24','cwetherill24@dailymotion.com','B0l3bklJ','9786123991','08163 Waxwing Park'),(96,'tferrers25','aberzin25@t-online.de','P0FFWgLBth','8513610893','121 Stang Center'),(97,'klaugier26','lbodell26@deviantart.com','Rvc0jpBR','3556957456','1321 Swallow Place'),(98,'wcomettoi27','dcarrell27@nps.gov','16i6Zvwl4nc','3614288687','71 Vahlen Road'),(99,'ifilipowicz28','mcresser28@flickr.com','htIky75K5','6164585879','91089 Red Cloud Plaza'),(100,'mvigar29','eclempton29@gov.uk','9gFY7SNNQWVq','7186381375','74 Riverside Park'),(101,'dlarder2a','gsale2a@usatoday.com','lFpoQnRzI9XV','6025961050','60173 Manufacturers Drive'),(102,'mentwistle2b','measthope2b@oaic.gov.au','FAVyhZFCiLiy','4961564600','1 Fremont Trail'),(103,'hcianni2c','mprettyjohns2c@google.it','3sPSFv','1707444581','56033 Crescent Oaks Plaza'),(104,'nbarnwell2d','lpinkie2d@skyrock.com','q1VMHA5Os','6769816190','3 Fuller Circle'),(105,'bpawlicki2e','theckney2e@bbb.org','GP3pqV','8221603653','02275 Pierstorff Crossing'),(106,'lhagergham2f','jyukhnev2f@marriott.com','MT3M1chkgY9','6262512446','856 Bobwhite Hill'),(107,'sgoby2g','lcharrett2g@squidoo.com','I7bTmMz','3235049045','83 Scofield Plaza'),(108,'alangmaid2h','npickthorn2h@pagesperso-orange.fr','6SZvEz','7176097968','9167 Dwight Center'),(109,'rcaudrey2i','toakinfold2i@oracle.com','T8kX21J','8736492874','6399 Warrior Lane'),(110,'icuell2j','jhalpen2j@tinyurl.com','7wxPnxmmim','9169015445','26 High Crossing Park'),(111,'jcourtois2k','kwoodman2k@comcast.net','I99aMhuxzVOx','2937194153','99 Lotheville Lane'),(112,'rhonisch2l','bmorffew2l@telegraph.co.uk','U8bhItnf','1215548971','14819 Jana Terrace'),(113,'pdufray2m','dalthrop2m@blinklist.com','FNG0RYf06','2981475927','73 American Street'),(114,'tnoto2n','kschiell2n@pinterest.com','SJSpq5u','8586882685','415 Hayes Pass'),(115,'faronowicz2o','koaten2o@jalbum.net','4iTM5CbI','1207889605','7 Katie Center'),(116,'hburds2p','ebrindle2p@discuz.net','JK4OAAZdbqY','1702430294','8470 Kipling Trail'),(117,'sjagoe2q','dbrewitt2q@squarespace.com','UTpTI9xcX2ky','6976861789','8 Dovetail Point'),(118,'wdymidowicz2r','kquenell2r@imgur.com','KzDZgf','9726399673','12 Pankratz Pass'),(119,'bwaterfall2s','epenvarne2s@last.fm','mHt2Phttu4oN','6682438404','7 Summer Ridge Crossing'),(120,'tlewis2t','tlagne2t@spotify.com','uHRoePdPWDB','5103779266','8066 Namekagon Street'),(121,'mcorballis2u','gimort2u@nymag.com','oOEeHMY','4796748703','7710 Lerdahl Point'),(122,'sgudyer2v','jcopello2v@boston.com','YWKrri3vLq8q','1021533312','1991 West Crossing'),(123,'vsalkild2w','arieme2w@amazon.de','32aAaAe','8277534929','2 High Crossing Avenue'),(124,'jgreenhalgh2x','cruffell2x@etsy.com','BcxQgSy','8344883502','2 Golden Leaf Parkway'),(125,'canthoney2y','spoff2y@theguardian.com','GzA7RhZ7h','5122985436','6 Blue Bill Park Trail'),(126,'zrobet2z','slangeren2z@hexun.com','YB7EP4D','9672095247','147 Bartillon Park'),(127,'mkleiner30','kwalewski30@deliciousdays.com','7NxVt1rtDP','2112290769','75062 Hollow Ridge Lane'),(128,'ibriars31','bshimmin31@yahoo.com','JD0A3Ps','8952777374','35 Kipling Parkway'),(129,'gmcvrone32','smckeighen32@ibm.com','N0UUZAT','4781941474','23943 Roxbury Alley'),(130,'gbateson33','jgarretts33@biglobe.ne.jp','l5ANxLLN','3452726179','566 Summit Center'),(131,'bchate34','adecristoforo34@sohu.com','dlmIxkf','3939229055','69514 Acker Terrace'),(132,'flavender35','jducket35@mac.com','yNg503OAzmN7','4316838884','7 Trailsway Drive'),(133,'uvogl36','gperroni36@tinypic.com','9jzZ0FMeM9','2187042686','7 Beilfuss Avenue'),(134,'aarnowitz37','mwhitear37@furl.net','CQyQjOu6I','5616790711','823 Bunting Avenue'),(135,'amoss38','lpitcher38@netscape.com','G4iBXe','6524679442','2700 Oneill Parkway'),(136,'tkuhwald39','wmucklestone39@ameblo.jp','CLAilMWFEU5L','8973291957','1 Everett Court'),(137,'vrowter3a','kleverage3a@patch.com','LGN51ln','9744180851','489 1st Street'),(138,'hmager3b','lrichardes3b@sciencedaily.com','qJv3OoA','7728148348','225 Lighthouse Bay Park'),(139,'jmcarte3c','teberts3c@cbslocal.com','9M8c0fngPN','3891009140','1743 Artisan Parkway'),(140,'new username','ydaubney3d@shinystat.com','PtenQa1Bn8mh','7162784311','9 Independence Crossing'),(141,'bprazer3e','ryard3e@example.com','msakUxb4Hh','2694782531','61092 Crest Line Court'),(142,'slornsen3f','bchristoffels3f@yelp.com','eDDDVi2','2986804261','418 Calypso Pass'),(143,'tcurdell3g','hliddall3g@businessinsider.com','O5kCNs','6267454870','2490 Eagan Pass'),(144,'ctydd3h','mkeech3h@va.gov','v9flqgyayEF','9129843350','421 Pearson Avenue'),(145,'tclaffey3i','tdunkerton3i@gravatar.com','hrho2m9CHEA','8501537212','09982 Ridgeway Plaza'),(146,'dlintin3j','pbusse3j@walmart.com','jvpkRy7fbz','7209794073','060 Daystar Parkway'),(147,'cburcombe3k','usiaspinski3k@topsy.com','AIJ1fu','5994619262','3 Nova Way'),(148,'mbertelsen3l','oasals3l@jugem.jp','wVGxBQOR9B','9113462416','3495 Mcbride Trail'),(149,'nmillhouse3m','kpendlington3m@virginia.edu','xY1uFA','4099536902','0033 Delladonna Drive'),(150,'new username','','','',''),(151,'ptalmadge3o','dbeales3o@engadget.com','jKSp1pu','8364440202','63697 Thackeray Alley'),(152,'cbegwell3p','dgrierson3p@washington.edu','OYhR8H','4525454157','6 Debra Lane'),(153,'deasman3q','lgerhold3q@ustream.tv','QtVKOtANTYeJ','5493415260','348 Crescent Oaks Drive'),(154,'ccruddas3r','jleathart3r@typepad.com','AxQqSO','4228164180','360 Susan Point'),(155,'cricards3s','kmatuszyk3s@mail.ru','pVSGKUACF','9873988287','59527 Columbus Park'),(156,'mpaskin3t','rgreenleaf3t@kickstarter.com','7vTaIarx7','5952341684','02725 Farmco Parkway'),(157,'tedess3u','jallred3u@trellian.com','cnlD0p','9588771088','6 Hintze Crossing'),(158,'mlafford3v','blownie3v@cpanel.net','lupTCF','9579558574','0 Butternut Pass'),(159,'swhalebelly3w','aizzard3w@wiley.com','c4GLnrgzHvF','3107257522','17 Killdeer Parkway'),(160,'agierke3x','aconklin3x@fastcompany.com','bgeORQBj6T3','4738728277','6 Weeping Birch Avenue'),(161,'asilby3y','aworshall3y@bloglines.com','GEKymD0NuK','2106049425','44853 Lunder Terrace'),(162,'dcisco3z','stenman3z@nationalgeographic.com','J2gvBM','4293713724','4485 Messerschmidt Avenue'),(163,'eklassmann40','hwillshaw40@google.it','y3cH9Q1mjI','9265841656','7659 Welch Street'),(164,'ybuckthought41','rwaitland41@360.cn','boyvTtHM6uON','5818369580','71 Loeprich Place'),(165,'vgiffen42','cemanson42@webs.com','UcFCOxqC5stK','7604932808','711 Macpherson Center'),(166,'eeckersall43','bbound43@zdnet.com','mKoXiWLF7ib','9008066647','93 Esch Plaza'),(167,'emorcombe44','sacuna44@japanpost.jp','HWLoTsY','3055172414','6 Cambridge Terrace'),(168,'ygorcke45','gmussolini45@techcrunch.com','ICzWiofZz1Y','6117355848','107 North Plaza'),(169,'abaraclough46','vvanhalen46@opensource.org','jPEbO0deVyQ','8875106677','4 Prairie Rose Parkway'),(170,'rdowers47','dcullington47@a8.net','eWFG3FgR','7632717582','29 Mariners Cove Crossing'),(171,'mmyerscough48','hmacguiness48@purevolume.com','z4mw8uwcuYZf','8202705599','84726 Judy Trail'),(172,'fwarsop49','apotes49@sciencedirect.com','bpnZtGNz97','7705167301','76183 Dahle Center'),(173,'rboak4a','ahearsum4a@nih.gov','QNf8Aah2S','5996453382','29495 Hagan Way'),(174,'sdron4b','linnwood4b@cmu.edu','kTsPqw7','8628815405','8592 Arapahoe Point'),(175,'apierrepont4c','aillwell4c@state.tx.us','5sFrpO1imovt','8467375075','99439 2nd Place'),(176,'dtabour4d','reaster4d@over-blog.com','Xu1wqkwg','1757214110','62221 Quincy Avenue'),(177,'aghidini4e','lstanlike4e@harvard.edu','azfHlvX','6295180276','02163 Gulseth Drive'),(178,'karsey4f','evarker4f@harvard.edu','gHkQxU5lApm','9858097797','34101 Melrose Crossing'),(179,'mlewin4g','tbrearton4g@prnewswire.com','tlUYY80VpLfm','6966757562','748 Veith Street'),(180,'nnouch4h','pgilvary4h@jiathis.com','vbPhSWbBsV','9918527368','18870 Lerdahl Point'),(181,'ndollard4i','cquare4i@tinypic.com','MkChky4o','5276763695','6720 Towne Terrace'),(182,'cgrealey4j','fpender4j@sbwire.com','F8GyXf5x','5652689083','4714 Annamark Avenue'),(183,'stakis4k','qeplett4k@census.gov','swyWNG','9221785584','98950 Eagle Crest Street'),(184,'phultberg4l','korriss4l@lulu.com','tAp70qqLhEf','9695698405','7 Gulseth Court'),(185,'gyukhtin4m','ncarlens4m@dedecms.com','guAkWJVH8oqg','7099600142','03838 Myrtle Alley'),(186,'rhofton4n','fcaveill4n@xinhuanet.com','lmTXPDVMmX','7997000580','065 Walton Point'),(187,'lsarsons4o','sbaldini4o@yellowpages.com','4s1l3P6W','6039871607','38261 Manufacturers Parkway'),(188,'wmaccorley4p','dhasel4p@ning.com','eiIqm0RKLPA','4381719700','7191 Nevada Street'),(189,'segleofgermany4q','fleggat4q@amazon.de','OY4aHn8AEN','6565435315','9 Westerfield Junction'),(190,'smctrustey4r','cdimmer4r@hubpages.com','R8YYJnBvn','1202283268','70911 Mitchell Circle'),(191,'rsemken4s','lcolmore4s@cisco.com','4xVnL6B7AYM','1425926069','82 Oxford Road'),(192,'odigger4t','spimblotte4t@arizona.edu','PbzPuTt5NsP6','6758652567','72701 Waxwing Park'),(193,'eskipping4u','ecaulkett4u@ox.ac.uk','YYvjuASqRNI','9383094100','4407 Stone Corner Hill'),(194,'skilmister4v','bthreadgill4v@chronoengine.com','dXeL0RaJRh','6272149304','11 Bowman Drive'),(195,'ddanilevich4w','cwilkerson4w@nba.com','Z9FtC4GZv6JZ','3233207392','8704 Londonderry Street'),(196,'jsurcomb4x','nzappel4x@goo.ne.jp','jzMQWsiFSC','6467110820','607 Homewood Way'),(197,'kgelder4y','eanmore4y@independent.co.uk','xUMnM9tDG','8392202205','220 Logan Terrace'),(198,'gganny4z','fdambrosio4z@sourceforge.net','kLTY3FVENX3v','4839179821','6 Rusk Parkway'),(199,'thealeas50','rhaseman50@ebay.co.uk','hCD6mA','5845218956','8890 Moose Way'),(201,'sgorthy52','gliddel52@webs.com','Ge7PAI06U7t','8885788367','7 Washington Circle'),(202,'mjindra53','ctuckwell53@artisteer.com','oKnZUcKtb','9992830676','17061 Sachs Crossing'),(203,'eheinsh54','ttaggerty54@yellowpages.com','CPmJAahxLFjS','1331620687','87 Hayes Drive'),(204,'rdinisco55','tshawel55@tmall.com','v6G5Wcw','8492064674','49261 Montana Crossing'),(205,'lianizzi56','sbrangan56@creativecommons.org','Zt2wUyEj7','7901095434','644 Arapahoe Parkway'),(206,'mrabley57','flangstone57@miibeian.gov.cn','86WVPvVnE','1232513257','087 Mifflin Way'),(207,'nsandaver58','phappert58@cbslocal.com','j6kR091','4241632410','043 Pankratz Hill'),(208,'bhyndes59','dlabrum59@webmd.com','GYow7ITu','4924988879','6 Waxwing Crossing'),(209,'jpoytheras5a','wdanihelka5a@nbcnews.com','KI6bhRT3ME','4921454230','987 Leroy Avenue'),(210,'bwasiela5b','dfarthing5b@constantcontact.com','FMPm8sYLqlKF','1997168637','10 Riverside Alley'),(211,'hfairham5c','clarratt5c@discovery.com','qRXYjPFnijU3','7729748430','871 Erie Pass'),(212,'mgarmanson5d','ashanklin5d@t.co','aSSOZMgmTIhJ','7153521558','175 Petterle Trail'),(213,'fcornier5e','gcollough5e@sphinn.com','RdUe3U','1806028688','2 Bunting Hill'),(214,'hmidner5f','asirey5f@state.gov','vgHd4Ot8','2487691835','7 Lien Plaza'),(215,'gnendick5g','ssilmon5g@networksolutions.com','66LXaxK','6746730614','1 Scofield Lane'),(216,'lsawl5h','lcariss5h@vinaora.com','vXwGYh','8864745544','95 North Junction'),(217,'athomann5i','lrutley5i@smh.com.au','uUU8Q5Fzrjs','1287921656','90 Holmberg Trail'),(218,'wcaswell5j','aambroise5j@meetup.com','sL6Nka08S','6148995311','12 Artisan Road'),(219,'mcardenas5k','anorgan5k@sfgate.com','VRb14KCTajQM','6928348623','59 Hoffman Terrace'),(220,'kjolliffe5l','dknollesgreen5l@walmart.com','OpYSSo02rGeN','7745349975','27014 Schiller Center'),(221,'erealy5m','rgoggin5m@webmd.com','zdXy2HWQiW7','6354204978','86917 Redwing Center'),(222,'tchaston5n','cwayne5n@php.net','ysxymMp6XJuH','5823682327','11868 Bluejay Drive'),(223,'ischooley5o','esole5o@bandcamp.com','FdziNLRB6X','4706534100','8 Green Ridge Parkway'),(224,'hpocklington5p','bspafford5p@ezinearticles.com','j4Nbgf3wwrS','7196983509','6 5th Pass'),(225,'chaine5q','jskyrme5q@naver.com','0EYQbztz','8175904905','7 Reinke Lane'),(226,'maguirrezabal5r','lingle5r@behance.net','FKRp8a','1718558463','323 South Lane'),(227,'aembra5s','gheakey5s@admin.ch','ANKfDnG','8557161285','8 Fairview Circle'),(228,'ysissons5t','bbridgeland5t@bizjournals.com','Q853JuhXS','6607413170','29582 Porter Park'),(229,'mholdall5u','jscudder5u@ustream.tv','NOti6c7FvcCk','2944850464','3864 Commercial Road'),(230,'rthomazin5v','ctole5v@businessweek.com','vtyXsc','2468412628','36 Veith Parkway'),(231,'jmacsorley5w','nmccurdy5w@fc2.com','iWHz1u','5946313662','616 Lunder Drive'),(232,'tcahey5x','cbaudinet5x@printfriendly.com','9MauPwBYN','4236436097','91770 Prentice Circle'),(233,'lkille5y','hcorain5y@discuz.net','MS93QhJH02X','8757502346','7 Main Drive'),(234,'dmallender5z','mberrygun5z@ezinearticles.com','PPkFPhhOrx','1507914385','71 Judy Pass'),(235,'ncastanyer60','cca60@flavors.me','TEWIvTyCm70','4704474365','19 Buell Trail'),(236,'wmacgowing61','rconklin61@unblog.fr','tYsvAY','1955135002','91 Almo Junction'),(237,'ldaber62','nmcteer62@google.fr','Yb87WwzYraH','7238701474','561 Grim Way'),(238,'blangdon63','djoseff63@creativecommons.org','0IzRUN','2377559124','7 Caliangt Hill'),(239,'sdunlea64','lblacket64@diigo.com','vhPG4K3f','1664563418','92 Dexter Court'),(240,'fhoulworth65','ariba65@ucoz.ru','NmqwFd8vRgF','1632275975','9103 Heffernan Trail'),(241,'fbroyd66','blau66@deviantart.com','qi4NR93T','8859796228','2 Hanson Avenue'),(242,'ktwitchett67','bdegue67@arizona.edu','NYMqZnBbCeq','6123565242','93202 Commercial Pass'),(243,'bgadeaux68','coveril68@state.tx.us','QI6PjC0w','1557827632','21 Birchwood Junction'),(244,'rgilliver69','gsidnell69@yellowbook.com','mCePNA','9239254002','33762 Oxford Alley'),(245,'mvanwaadenburg6a','sdunton6a@angelfire.com','FiqTpXEmx','9203502255','713 Mcbride Crossing'),(246,'rscranney6b','ahuggin6b@toplist.cz','DEI3Sa','1962131788','7196 Marquette Crossing'),(247,'ladel6c','ahamor6c@adobe.com','5LKIv3Dyi','3178299953','3 Shelley Terrace'),(248,'hnevett6d','jmcgarrity6d@columbia.edu','7hqHmXwAg','9738255887','94 Toban Lane'),(249,'kgoter6e','dcridlan6e@hugedomains.com','YIngzuP','8288526676','223 Grover Hill'),(250,'tpilgram6f','fcastellucci6f@cyberchimps.com','AnabJl','4804785927','8664 Buell Terrace'),(251,'ncurl6g','klebang6g@rambler.ru','rfKQ2ZO3cuWh','9521157140','522 Troy Street'),(252,'gwaistall6h','hacome6h@discuz.net','4EHkC7esjkCr','2812069725','6859 Lyons Circle'),(253,'oweine6i','pflucker6i@mozilla.org','myilZYOVf','2165929304','3 Stoughton Street'),(254,'csimants6j','eaiston6j@google.nl','XgCeqB0L','8301255320','35690 American Ash Place'),(255,'imiddlehurst6k','cmcgivena6k@weibo.com','ApTTQed','9863635924','86393 Leroy Drive'),(256,'flucian6l','labramovitz6l@trellian.com','M7uRaLsmP','7408749080','4 Forest Run Court'),(257,'emungan6m','hwishkar6m@163.com','QgcAlk0','7008295169','95 Upham Hill'),(258,'njozsef6n','nsullivan6n@eepurl.com','xDkXtoYg','1274501779','551 Surrey Crossing'),(259,'bpeacher6o','scolwell6o@privacy.gov.au','4UsmauXPzCY','9718089046','131 Welch Trail'),(260,'sbaglow6p','mspeere6p@apache.org','sQ9pMtZYoyqV','8381404444','4282 American Ash Alley'),(261,'rsmowton6q','dvanvelde6q@apache.org','9Hxqwg47pqB8','3755674540','9517 Surrey Road'),(262,'ldressel6r','wcollum6r@51.la','5Hz4tfolzW','9642793483','06249 Kennedy Plaza'),(263,'msingers6s','nhazelden6s@issuu.com','U5LMjtWB1','4958952340','006 Cordelia Way'),(264,'gglacken6t','hparlot6t@xrea.com','ueOQTb','7741017829','4 Westridge Terrace'),(265,'mgoadbie6u','fjessop6u@discovery.com','EN5IySGKo97B','6916445889','7 Blue Bill Park Crossing'),(266,'amartensen6v','gplumley6v@bing.com','9F7rnlyS','5229092410','5 Cottonwood Way'),(267,'bgosforth6w','mhutchens6w@disqus.com','f3xNgatpWQX','1424704607','58492 Goodland Court'),(268,'tcrichmer6x','sohegertie6x@google.es','pjK6DaPGO','9377071431','3 Ruskin Trail'),(269,'nisacoff6y','baldham6y@plala.or.jp','iWbdX5G','4836381937','5587 Kenwood Street'),(270,'rwooder6z','lcrangle6z@xrea.com','DOTYisacrKia','4132162421','65729 Cardinal Center'),(271,'duridge70','mjeanet70@dot.gov','luc2IN3MV','9799336539','28900 Elka Trail'),(272,'abrayshay71','mmicco71@dagondesign.com','FiYJfUWN','8482467011','7902 Maple Trail'),(273,'pgiuron72','ljaher72@unicef.org','M7BfvI5ONk5i','3902308979','80641 Rockefeller Hill'),(274,'broyal73','tdecullip73@pen.io','ykuWu7KcT9e','2928412825','10140 International Junction'),(275,'dwhittingham74','bemerton74@umich.edu','WqEyIf','7436323023','6766 Goodland Place'),(276,'gpanketh75','dprati75@blogtalkradio.com','zv5FUy','7169212624','7 Golf View Drive'),(277,'kmcgibbon76','tfluger76@webmd.com','n64xepc','2396329678','7 Jay Pass'),(278,'acatling77','hcreasey77@imgur.com','Woa7uiD','1189928719','54200 Jenifer Pass'),(279,'amuriel78','sbrignell78@accuweather.com','7dv4V38','6268797902','267 Victoria Circle'),(280,'jpallatina79','mmaydwell79@tumblr.com','0YiQDE','1367844864','3911 Fordem Parkway'),(281,'rrambadt7a','bbonnaire7a@umich.edu','84Gg4oVqRD3','5375520010','68307 Dottie Way'),(282,'dskates7b','lwoehler7b@disqus.com','Z5ufL6','2096434176','7 Moose Court'),(283,'gfoux7c','bgater7c@oakley.com','pPOvoWkwbEr','2101761248','15261 Ridgeway Drive'),(284,'aalvares7d','ctavernor7d@addthis.com','c8acvK61lB','9186123195','655 Monument Court'),(285,'aedgeler7e','kflagg7e@usda.gov','RKzHENcMI','6418706104','9008 Jenna Hill'),(286,'gmarham7f','mchaunce7f@bbc.co.uk','NhErbCH5UgAZ','3253154455','611 Lillian Way'),(287,'tpettifor7g','ptunn7g@google.com.hk','zIRNeZmjHl','5806037994','00 Harper Road'),(288,'fwontner7h','choworth7h@weebly.com','di9EpAD','7998997204','7374 Oak Way'),(289,'aambresin7i','cnelthrop7i@guardian.co.uk','kDaVUa','6326618113','677 Del Sol Road'),(290,'marnao7j','tdonnellan7j@squidoo.com','qCJXfrrw','5995531772','96 Oak Point'),(291,'abratley7k','cwarmisham7k@thetimes.co.uk','6KYIr77uyHq0','2487946877','99 Dorton Parkway'),(292,'mmarder7l','sbony7l@vk.com','wNWvjd4j5B','2804941057','10380 Cherokee Pass'),(293,'cjiles7m','jewbanks7m@va.gov','ZaQirz','3115240841','92 Tennessee Crossing'),(294,'bstreeter7n','pwhaites7n@sitemeter.com','bCf8ZLAJ7Ho','4263624321','22187 Cody Drive'),(295,'lkimbrough7o','khatley7o@sogou.com','LLuKDxQuIG56','4398561917','44450 Lerdahl Trail'),(296,'aquenell7p','stilt7p@artisteer.com','2iC2EUB','3899868580','4 Florence Parkway'),(297,'dcoytes7q','hstorres7q@wisc.edu','CELGQ6zSNuYC','9778825988','05666 Bonner Crossing'),(298,'lsamper7r','hbodleigh7r@hatena.ne.jp','nfaRX4w40b','2966288679','5 Grim Pass'),(299,'asewall7s','kduffield7s@edublogs.org','3pcdnPKYg8','6011541309','012 Paget Park'),(300,'newwaley','null','newpassword','01005050500','i moved away'),(301,'newwaley','undefined','newpassword','01005050500','i moved away'),(302,'newwaley','undefined','newpassword','01005050500','i moved away'),(303,'newwaley','\'\'','newpassword','01005050500','i moved away'),(304,'newwaley','ddoolan7x@go.com','newpassword','01005050500','i moved away'),(305,'newwaley','cfair7y@friendfeed.com','newpassword','01005050500','i moved away'),(306,'he he he','ghousegoe7z@github.io','newpassword','01005050500','i moved away'),(312,'cbeckingham85','sjanek85@google.ca','DwYMFwGSSjM','6766832636','4 Maryland Park'),(322,'ali','ali@gmail.com','some_password','01001001010','my home'),(323,'waleyldeenahmed','waleyeldeenahmed@gmail.com','$2a$04$81Fc6OOEc3SYWk.7RyHir.KYSv2KzsHOkR9RlME4c7nY/gRSc/YRS','01007135850','El-Nabawy El-Mohendes, Al-Agouza');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nodejs-demo-new'
--
/*!50003 DROP FUNCTION IF EXISTS `delete_cart_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `is_user_exist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_user_exist`(
	_id INT,
    _email VARCHAR(64)
) RETURNS int
    DETERMINISTIC
BEGIN
    RETURN (SELECT count(*) FROM `user` u
	WHERE u.id = ifnull(_id, u.id) AND u.email = ifnull(_email, u.email));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_cart_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_product_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product_by_id`(
	_id INT
)
BEGIN
	DELETE FROM product
    WHERE id = _id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_user_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user_by_id`(
	id INT
)
BEGIN
	DELETE FROM user u
    WHERE u.id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_products` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products`(
	_id INT,
    _title VARCHAR(64),
    _category_name VARCHAR(64),
    _price INT,
    _stock INT
)
BEGIN
	SELECT * FROM `nodejs-demo-new`.product
    WHERE id = ifnull(_id, id) 
		AND title = ifnull(_title, title)
        AND category_name = ifnull(_category_name, category_name)
		AND price = ifnull(_price, price)
        AND stock = ifnull(_stock, stock)
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_users` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cart_items`(
	_user_id INT
)
BEGIN
	SELECT
		p.id,
		p.title,
        p.category_name,
        p.price
	FROM
		user u
	JOIN
		cart c ON u.id = c.user_id
	JOIN
		cart_item ci ON c.id = ci.cart_id
	JOIN
		product p ON ci.product_id = p.id
	WHERE
		u.id = _user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cart_summary` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_cart_summary`(
	_user_id INT
)
BEGIN
	SELECT 
		SUM(ci.quantity) AS items_count,
		SUM(ci.quantity * p.price) AS total_price
	FROM
		user u
			JOIN
		cart c ON u.id = c.user_id
			JOIN
		cart_item ci ON c.id = ci.cart_id
			JOIN
		product p ON ci.product_id = p.id
	WHERE
		u.id = _user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_one_cart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_one_cart`(
	_id INT,
    _user_id INT
)
BEGIN
	SELECT * FROM cart
    WHERE id = ifnull(_id, id) AND user_id = ifnull(_user_id, user_id) 
    AND (_id IS NOT NULL OR _user_id IS NOT NULL);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_cart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_cart`(
	_user_id INT
)
BEGIN
	INSERT INTO cart (user_id)
    VALUE (_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_cart_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_cart_item`(
	_user_id INT,
    _product_id INT,
    _quantity INT
)
BEGIN
	INSERT INTO cart_item
	SELECT
		c.id,
		p.id,
		_quantity
	FROM
		user u
	JOIN
		cart c ON u.id = c.user_id
	JOIN
		product p ON p.id = _product_id
	WHERE
		u.id = _user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_or_update_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_product`(
	_id INT,
    _title VARCHAR(64),
    _category_name VARCHAR(64),
    _price INT,
    _stock INT
)
BEGIN
	IF _id <= 0 THEN
		INSERT INTO product (title, category_name, price, stock)
        VALUES (_title, _category_name, _price, _stock);
	ELSE
		UPDATE product
        SET
			title = IFNULL(_title, title),
			category_name = IFNULL(_category_name, category_name),
			price = IFNULL(_price, price),
			stock = IFNULL(_stock, stock)
		WHERE
			id = _id AND (
				title IS NOT NULL OR
				category_name IS NOT NULL OR
                price IS NOT NULL OR
                stock IS NOT NULL);
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_or_update_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_or_update_user`(
	_id INT,
    _username varchar(64),
    _email varchar(64),
    _password char(60),
    _phone varchar(11),
    _home_address varchar(64)
)
BEGIN
	IF _id <= 0 THEN
		INSERT INTO user (username, email, `password`, phone, home_address)
        VALUES (_username, _email, _password, _phone, _home_address);
        CALL insert_cart(last_insert_id());
	ELSE
		UPDATE user
        SET
			username = IFNULL(_username, username),
			email = IFNULL(_email, email),
			`password` = IFNULL(_password, `password`),
			phone = IFNULL(_phone, phone),
			home_address = IFNULL(_home_address, home_address)
		WHERE
			id = _id AND (_username IS NOT NULL OR
				_email IS NOT NULL OR
                _password IS NOT NULL OR
                _phone IS NOT NULL OR
                _home_address IS NOT NULL);
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-20 22:53:20
