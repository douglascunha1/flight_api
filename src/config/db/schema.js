import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", ["admin", "regular"]);

export const aircraft = pgTable("aircraft", {
  aircraft_id: serial("aircraft_id").primaryKey(),
  model: varchar("model", { length: 50 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 50 }).notNull(),
  capacity: integer("capacity").notNull(),
});

export const passenger = pgTable("passenger", {
  passenger_id: serial("passenger_id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  birth_date: date("birth_date").notNull(),
  passport_number: varchar("passport_number", { length: 20 }).notNull().unique(),
});

export const flight = pgTable("flight", {
  flight_id: serial("flight_id").primaryKey(),
  flight_number: varchar("flight_number", { length: 10 }).notNull().unique(),
  departure_airport: varchar("departure_airport", { length: 5 }).notNull(),
  arrival_airport: varchar("arrival_airport", { length: 5 }).notNull(),
  departure_time: timestamp("departure_time", { withTimezone: true }).notNull(),
  arrival_time: timestamp("arrival_time", { withTimezone: true }).notNull(),
  aircraft_id: integer("aircraft_id").notNull().references(() => aircraft.aircraft_id),
});

export const boarding_pass = pgTable("boarding_pass", {
  boarding_pass_id: serial("boarding_pass_id").primaryKey(),
  seat_number: varchar("seat_number", { length: 5 }).notNull(),
  passenger_id: integer("passenger_id").notNull().references(() => passenger.passenger_id),
  flight_id: integer("flight_id").notNull().references(() => flight.flight_id),
  issue_time: timestamp("issue_time", { withTimezone: true }).notNull(),
});

export const sys_user = pgTable("sys_user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  login_email: varchar("login_email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  user_type: userTypeEnum("user_type").notNull(),
});