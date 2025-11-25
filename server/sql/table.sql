CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "role" varchar,
  "phone" varchar,
  "address" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "brands" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "brand_id" integer,
  "description" varchar,
  "price" integer,
  "stock" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "total_amount" integer,
  "status" varchar,
  "shipping_address" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "order_items" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "product_id" integer,
  "quantity" integer,
  "price" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "product_categories" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "category_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "product_categories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "product_categories" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
