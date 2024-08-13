import 'server-only';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  primaryKey
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
// import { eq } from 'drizzle-orm/pg-core'; // Make sure to import eq

// Initialize database
export const db = drizzle(neon(process.env.POSTGRES_URL!));

// Define status enum
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Define roles enum
export const roleEnum = pgEnum('role', ['admin', 'hospital', 'doctor', 'receptionist']);

// Define roles table
export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: roleEnum('role').notNull().unique()
});

// Define users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role_id: uuid('role_id').references(() => roles.id),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull().unique(),
  created_at: timestamp('created_at').defaultNow()
});

// Define sessions table
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id),
  token: text('token').notNull(),
  expires_at: timestamp('expires_at').notNull(),
  created_at: timestamp('created_at').defaultNow()
});

// Define tokens table for refresh tokens
export const tokens = pgTable('tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id),
  refresh_token: text('refresh_token').notNull(),
  expires_at: timestamp('expires_at').notNull()
});

// Define types for selects
export type SelectUser = typeof users.$inferSelect;
export type SelectRole = typeof roles.$inferSelect;
export type SelectSession = typeof sessions.$inferSelect;
export type SelectToken = typeof tokens.$inferSelect;

// Define schema for inserts
export const insertUserSchema = createInsertSchema(users);
export const insertRoleSchema = createInsertSchema(roles);
export const insertSessionSchema = createInsertSchema(sessions);
export const insertTokenSchema = createInsertSchema(tokens);

// export const deleteSessionByToken = async (token: string) => {
//   await db.delete(sessions).where(eq(sessions.token, token));
// };
// export const deleteTokenByUserId = async (userId: string) => {
//   await db.delete(tokens).where(eq(tokens.user_id, userId));
// };

export interface SelectDoctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  // profilePictureUrl: string;
  imageUrl: string;
  availability: string;
  education: string;
  // Add other fields as needed
}
