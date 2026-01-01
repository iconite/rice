import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';

// Config table for contact info
export const config = pgTable('config', {
  key: text('key').primaryKey(),
  value: text('value'),
});

// Products table
export const products = pgTable('products', {
  slug: text('slug').primaryKey(),
  title: text('title'),
  origin: text('origin'),
  description: text('description'),
  detailedDescription: text('detailedDescription'), // Lowercase for Postgres compatibility
  image: text('image'),
  climate: text('climate'),
  growingSeason: text('growingSeason'), // Lowercase
  yield: text('yield'),
  isHighDemand: integer('isHighDemand').default(0), // Lowercase
});

// Sub Products (Types)
export const subProducts = pgTable('sub_products', {
  slug: text('slug').primaryKey(),
  parentSlug: text('parent_slug'),
  title: text('title'),
  origin: text('origin'),
  description: text('description'),
  detailedDescription: text('detailedDescription'), // Lowercase
  image: text('image'),
  climate: text('climate'),
  growingSeason: text('growingSeason'), // Lowercase
  yield: text('yield'),
  isHighDemand: integer('isHighDemand').default(0), // Lowercase
});

// Varieties
export const varieties = pgTable('varieties', {
  id: serial('id').primaryKey(),
  productSlug: text('product_slug'),
  name: text('name'),
});

// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique(),
  passwordHash: text('password_hash'),
});

// Messages/Enquiries from contact form
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
