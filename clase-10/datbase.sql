CREATE TABLE "users" (
	"userUUID"	TEXT NOT NULL,
	"userEmail"	TEXT,
	"userPassword"	TEXT,
  "userFirstname" TEXT,
  "userLastname" TEXT,
	"userLevel"	INTEGER NOT NULL DEFAULT 10
);

CREATE TABLE "products" (
	"productUUID"	TEXT NOT NULL,
	"productName"	TEXT,
	"productDescription"	TEXT,
	"brandUUID"	TEXT,
	"modelUUID"	TEXT,
	"productPrice"	INTEGER
);

