-- Enable UUID extension for auto-generating secure IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oauth_provider VARCHAR(50) NOT NULL,
  oauth_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Books Table
CREATE TABLE IF NOT EXISTS books (
  id VARCHAR(255) PRIMARY KEY, -- Can hold a standard UUID or an ISBN string
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  cover_image_url TEXT,
  published_date DATE
);