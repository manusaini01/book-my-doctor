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
import { db } from '../db';

export const hospitals = pgTable('healthcare_facilities', {
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
