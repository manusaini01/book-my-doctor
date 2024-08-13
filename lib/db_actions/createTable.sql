-- schema.sql

-- Table for Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  hospital_id INT REFERENCES hospitals(id) -- Optional for clients and system-wide admins
);

-- Table for Hospital
CREATE TABLE hospitals (
  id SERIAL PRIMARY KEY,
  logo TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  address TEXT NOT NULL,
  registration_number VARCHAR(50) NOT NULL,
  website TEXT,
  specialties TEXT[],
  operating_hours TEXT
);

-- Table for Doctor
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  profile_picture TEXT NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  qualifications TEXT NOT NULL,
  experience INT NOT NULL,
  availability TEXT NOT NULL,
  consultation_fee NUMERIC(10, 2) NOT NULL,
  bio TEXT,
  languages_spoken TEXT[],
  hospital_id INT REFERENCES hospitals(id)
);

-- Table for Receptionist
CREATE TABLE receptionists (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  profile_picture TEXT NOT NULL,
  work_schedule TEXT NOT NULL,
  assigned_departments TEXT[],
  hospital_id INT REFERENCES hospitals(id)
);

-- Table for Admin
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  profile_picture TEXT NOT NULL,
  role VARCHAR(255) NOT NULL,
  permissions TEXT[],
  hospital_id INT REFERENCES hospitals(id) -- Optional for system-wide admins
);

-- Table for Client (Guest)
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  preferred_time TEXT NOT NULL
);
-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL -- e.g., 'admin', 'user'
);

-- sessions table
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL
);
