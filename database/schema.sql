-- Create assignowl_users table for storing email signups with phone and IP address
CREATE TABLE IF NOT EXISTS assignowl_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone_number VARCHAR(20),
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_assignowl_users_email ON assignowl_users(email);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_assignowl_users_created_at ON assignowl_users(created_at);