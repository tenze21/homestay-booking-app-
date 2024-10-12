CREATE TABLE "User"(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    contact_number VARCHAR(15) UNIQUE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    country VARCHAR(45) NOT NULL,
    region VARCHAR(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Host(
    user_id INT PRIMARY KEY,            -- user_id as the primary key (one-to-one relationship with User)
    education VARCHAR(100),
    spoken_languages TEXT,              -- Store multiple languages as a text string or JSON array
    profession VARCHAR(100),
    date_of_birth DATE,
    bio varchar(900),
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Role (
    role_id SERIAL PRIMARY KEY,       -- Auto-incrementing ID for each role entry
    user_id INT NOT NULL,             -- Foreign key referencing User
    role VARCHAR(50) NOT NULL,        -- Role name (e.g., 'Host', 'Guest', 'Admin')
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);