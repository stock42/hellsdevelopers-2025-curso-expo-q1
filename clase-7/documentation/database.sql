CREATE TABLE "products" (
	"product_id"	INTEGER NOT NULL UNIQUE,
	"product_name"	TEXT NOT NULL,
	"product_description"	TEXT,
	"product_base_price"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("product_id" AUTOINCREMENT)
);

CREATE TABLE "product_images" (
	"product_image_id"	INTEGER NOT NULL UNIQUE,
	"product_id"	INTEGER NOT NULL,
	"product_image_data"	TEXT NOT NULL,
	PRIMARY KEY("product_image_id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "products"("product_id")
);

CREATE TABLE "locations" (
	"location_id"	INTEGER NOT NULL UNIQUE,
	"location_name"	NUMERIC NOT NULL,
	"location_address"	TEXT NOT NULL,
	"location_coordinates"	TEXT,
	"location_image"	TEXT,
	PRIMARY KEY("location_id" AUTOINCREMENT)
);


CREATE TABLE "products_location" (
	"product_id"	INTEGER NOT NULL,
	"location_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL DEFAULT 0,
	"product_price"	INTEGER DEFAULT 0,
	FOREIGN KEY("location_id") REFERENCES "locations"("location_id"),
	FOREIGN KEY("product_id") REFERENCES "products"("product_id")
);

CREATE TABLE "users" (
	"user_id"	INTEGER NOT NULL UNIQUE,
	"user_name"	TEXT NOT NULL,
	"user_email"	TEXT NOT NULL,
	"user_password"	TEXT NOT NULL,
	PRIMARY KEY("user_id" AUTOINCREMENT)
);

CREATE TABLE "orders_status" (
    "order_status_id"	INTEGER NOT NULL UNIQUE,
    "order_status_name"	TEXT NOT NULL,
    PRIMARY KEY("order_status_id" AUTOINCREMENT)
);

CREATE TABLE "orders" (
	"order_id"	INTEGER NOT NULL UNIQUE,
    "location_id"	INTEGER NOT NULL,
	"order_date"	TEXT NOT NULL,
	"order_status_id" INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
    "order_total"	INTEGER NOT NULL DEFAULT 0,
	FOREIGN KEY("user_id") REFERENCES "users"("user_id")
    FOREIGN KEY("location_id") REFERENCES "locations"("location_id")
    FOREIGN KEY("order_status_id") REFERENCES "orders_status"("order_status_id")
);

CREATE TABLE "order_items" (
	"order_item_id"	INTEGER NOT NULL UNIQUE,
	"order_id"	INTEGER NOT NULL,
	"product_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL DEFAULT 0,
	"product_price"	INTEGER NOT NULL DEFAULT 0,
	FOREIGN KEY("order_id") REFERENCES "orders"("order_id"),
	FOREIGN KEY("product_id") REFERENCES "products"("product_id")
);

