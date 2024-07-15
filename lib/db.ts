import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// export const db = drizzle(neon('postgres://default:RlOANL69bvEh@ep-frosty-fire-a46aadhw-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require'));
export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}



export const hospitals = pgTable('hospitals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  dentists: integer('dentists').notNull(),
  experience: text('experience').notNull(),
  location: text('location').notNull(),
  consultationFee: numeric('consultation_fee', { precision: 10, scale: 2 }).notNull()
});


export type SelectHospital = typeof hospitals.$inferSelect;
export const insertHospitalSchema = createInsertSchema(hospitals);


// import { getManager } from "typeorm";

export async function getHospitals(
  search: string,
  offset: number
): Promise<{
  hospitals: SelectHospital[];
  newOffset: number | null;
  totalHospitals: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      hospitals: await db
        .select()
        .from(hospitals)
        .where(ilike(hospitals.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalHospitals: 0
    };
  }

  if (offset === null) {
    return { hospitals: [], newOffset: null, totalHospitals: 0 };
  }

  let totalHospitals = await db.select({ count: count() }).from(hospitals);
  let moreHospitals = await db.select().from(hospitals).limit(5).offset(offset);
  let newOffset = moreHospitals.length >= 5 ? offset + 5 : null;

  return {
    hospitals: moreHospitals,
    newOffset,
    totalHospitals: totalHospitals[0].count
  };
}

export async function deleteHospitalById(id: number) {
  await db.delete(hospitals).where(eq(hospitals.id, id));
}
