import { mysqlTable, serial, varchar, int, datetime, date, mysqlEnum } from "drizzle-orm/mysql-core";

export const aircraft = mysqlTable("aircraft", {
  aircraft_id: serial("aircraft_id").primaryKey(),
  model: varchar("model", { length: 50 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 50 }).notNull(),
  capacity: int("capacity").notNull(),
});

export const passenger = mysqlTable("passenger", {
  passenger_id: serial("passenger_id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  birth_date: date("birth_date").notNull(),
  passport_number: varchar("passport_number", { length: 20 }).notNull().unique(),
});

export const flight = mysqlTable("flight", {
  flight_id: serial("flight_id").primaryKey(),
  flight_number: varchar("flight_number", { length: 10 }).notNull().unique(),
  departure_airport: varchar("departure_airport", { length: 5 }).notNull(),
  arrival_airport: varchar("arrival_airport", { length: 5 }).notNull(),
  departure_time: datetime("departure_time").notNull(),
  arrival_time: datetime("arrival_time").notNull(),
  aircraft_id: int("aircraft_id").notNull().references(() => aircraft.aircraft_id),
});

export const boarding_pass = mysqlTable("boarding_pass", {
  boarding_pass_id: serial("boarding_pass_id").primaryKey(),
  seat_number: varchar("seat_number", { length: 5 }).notNull(),
  passenger_id: int("passenger_id").notNull().references(() => passenger.passenger_id),
  flight_id: int("flight_id").notNull().references(() => flight.flight_id),
  issue_time: datetime("issue_time").notNull(),
});

export const sys_user = mysqlTable("sys_user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  login_email: varchar("login_email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  user_type: mysqlEnum("user_type", ["admin", "regular"]).notNull(),
});
