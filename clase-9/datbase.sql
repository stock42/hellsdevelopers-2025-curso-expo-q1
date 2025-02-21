CREATE TABLE "users" (
	"userUUID"	TEXT NOT NULL,
	"userEmail"	TEXT,
	"userPassword"	TEXT,
  "userFirstname" TEXT,
  "userLastname" TEXT,
	"userLevel"	INTEGER NOT NULL DEFAULT 10
);

