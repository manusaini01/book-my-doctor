CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE hospitals (
    hospital_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT, -- Foreign key to users table
    name varchar(255) NOT NULL,
    email text NOT NULL UNIQUE,  -- Email with UNIQUE constraint
    logo text,
    description text,
    city varchar(100),
    state varchar(100),
    phone_number varchar(20),
    -- website_url varchar(255),
    -- operating_hours varchar(255),
    -- social_media_links jsonb,
    -- ratings numeric(3,2),
    -- reviews jsonb,
    -- virtual_tour_url varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE doctors (
    doctor_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hospital_id uuid NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    email text NOT NULL UNIQUE,  -- Email with UNIQUE constraint
    specialization varchar(255),
    qualifications text,
    contact_info jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE receptionists (
    receptionist_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hospital_id uuid NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    email text NOT NULL UNIQUE,  -- Email with UNIQUE constraint
    contact_info jsonb,
    shift_details jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);








CREATE TABLE availabilities (
    id UUID PRIMARY KEY,
    doctor_id UUID NOT NULL,
    available_days JSONB NOT NULL,
    available_hours JSONB NOT NULL,
    created_at TIMESTAMPTZ NULL,
    updated_at TIMESTAMPTZ NULL
);

CREATE TABLE doctor_receptionist_assignments (
    doctor_id UUID NOT NULL,
    receptionist_id UUID NOT NULL,
    PRIMARY KEY (doctor_id, receptionist_id)
);

CREATE TABLE doctor_receptionist_assignments (
    doctor_id UUID NOT NULL,
    receptionist_id UUID NOT NULL,
    hospital_id UUID NOT NULL,
    PRIMARY KEY (doctor_id, receptionist_id, hospital_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (receptionist_id) REFERENCES receptionists(receptionist_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);


CREATE TABLE doctors (
    doctor_id UUID PRIMARY KEY,
    hospital_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NULL,
    qualifications TEXT NULL,
    contact_info JSONB NULL,
    created_at TIMESTAMPTZ NULL,
    updated_at TIMESTAMPTZ NULL,
    user_id UUID NULL,
    email TEXT NOT NULL
    image_url TEXT NULL,
);

CREATE TABLE healthcare_facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    dentists INTEGER NOT NULL,
    experience VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    consultation_fee NUMERIC NOT NULL
);

CREATE TABLE hospitals (
    hospital_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT NULL,
    description TEXT NULL,
    address VARCHAR(255) NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    phone_number VARCHAR(20) NULL,
    email VARCHAR(255) NULL,
    website_url VARCHAR(255) NULL,
    operating_hours VARCHAR(255) NULL,
    social_media_links JSONB NULL,
    ratings NUMERIC NULL,
    reviews JSONB NULL,
    gallery_images JSONB NULL,
    virtual_tour_url VARCHAR(255) NULL,
    events JSONB NULL,
    news_announcements JSONB NULL,
    created_at TIMESTAMPTZ NULL,
    updated_at TIMESTAMPTZ NULL,
    user_id UUID NULL
);

CREATE TABLE receptionists (
    receptionist_id UUID PRIMARY KEY,
    hospital_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact_info JSONB NULL,
    shift_details JSONB NULL,
    created_at TIMESTAMPTZ NULL,
    updated_at TIMESTAMPTZ NULL,
    user_id UUID NULL,
    email TEXT NOT NULL
);

CREATE TABLE roles (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY,
    user_id UUID NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NULL
);

CREATE TABLE tokens (
    id UUID PRIMARY KEY,
    user_id UUID NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role_id UUID NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NULL
);

