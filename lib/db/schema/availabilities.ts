
// db/schema/availabilities.ts
// import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
// import { doctors } from './doctors';

// export const availabilities = pgTable('availabilities', {
//     id: uuid('id').default('gen_random_uuid()').primaryKey(),
//     doctorId: uuid('doctor_id').notNull().references(() => doctors.id, {
//         onDelete: 'cascade',
//     }),
//     availableDays: jsonb('available_days').notNull(),  // Store days as JSON, e.g., ["Monday", "Wednesday"]
//     availableHours: jsonb('available_hours').notNull(), // Store hours as JSON, e.g., {"Monday": ["09:00-12:00", "14:00-18:00"]}
//     createdAt: timestamp('created_at').defaultNow(),
//     updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
// });


export const availabilities = () => {
    
}
