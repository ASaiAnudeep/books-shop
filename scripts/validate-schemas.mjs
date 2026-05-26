import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaDir = path.resolve("analytics/schemas");
const schemaFiles = fs.readdirSync(schemaDir).filter((file) => file.endsWith(".json"));

const samples = {
  "page_view.v1.json": {
    name: "page_view",
    path: "/",
    source: "web",
    pageName: "Storefront"
  },
  "product_viewed.v1.json": {
    name: "product_viewed",
    path: "/book/b001",
    source: "web",
    productId: "b001",
    title: "The Last Mapmaker",
    genre: "Fiction",
    price: 22
  },
  "cart_item_added.v1.json": {
    name: "cart_item_added",
    path: "/",
    source: "web",
    productId: "b001",
    title: "The Last Mapmaker",
    quantity: 1,
    price: 22
  },
  "checkout_started.v1.json": {
    name: "checkout_started",
    path: "/checkout",
    source: "web",
    itemCount: 2,
    cartValue: 49,
    email: "reader@example.com"
  },
  "order_completed.v1.json": {
    name: "order_completed",
    path: "/success",
    source: "web",
    orderId: "ORD-123456",
    itemCount: 2,
    total: 49,
    email: "reader@example.com"
  }
};

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

for (const file of schemaFiles) {
  const schema = JSON.parse(fs.readFileSync(path.join(schemaDir, file), "utf8"));
  const validate = ajv.compile(schema);
  const sample = samples[file];

  if (!sample) {
    throw new Error(`No sample payload found for schema: ${file}`);
  }

  const valid = validate(sample);
  if (!valid) {
    throw new Error(`Schema validation failed for ${file}: ${ajv.errorsText(validate.errors)}`);
  }
}

console.log(`Validated ${schemaFiles.length} event schemas.`);
