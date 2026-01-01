
import { pgTable, text, integer, boolean, serial, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const config = pgTable('config', {
  key: text('key').primaryKey(),
  value: text('value'),
});

export const products = pgTable('products', {
  slug: text('slug').primaryKey(),
  title: text('title'),
  origin: text('origin'),
  description: text('description'),
  detailedDescription: text('detailedDescription'),
  image: text('image'),
  climate: text('climate'),
  growingSeason: text('growingSeason'),
  yield: text('yield'),
  isHighDemand: boolean('isHighDemand').default(false),
});

export const subProducts = pgTable('sub_products', {
  slug: text('slug').primaryKey(),
  parentSlug: text('parent_slug').references(() => products.slug, { onDelete: 'cascade' }),
  title: text('title'),
  origin: text('origin'),
  description: text('description'),
  detailedDescription: text('detailedDescription'),
  image: text('image'),
  climate: text('climate'),
  growingSeason: text('growingSeason'),
  yield: text('yield'),
  isHighDemand: boolean('isHighDemand').default(false),
});

export const varieties = pgTable('varieties', {
  id: serial('id').primaryKey(),
  productSlug: text('product_slug').references(() => products.slug, { onDelete: 'cascade' }),
  name: text('name'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique(),
  passwordHash: text('password_hash'),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  productType: text('product_type').notNull(),
  quantity: text('quantity').notNull(),
  destination: text('destination').notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const productsRelations = relations(products, ({ many }) => ({
  subProducts: many(subProducts),
  varieties: many(varieties),
}));

export const subProductsRelations = relations(subProducts, ({ one }) => ({
  parentProduct: one(products, {
    fields: [subProducts.parentSlug],
    references: [products.slug],
  }),
}));

export const varietiesRelations = relations(varieties, ({ one }) => ({
  product: one(products, {
    fields: [varieties.productSlug],
    references: [products.slug],
  }),
}));
