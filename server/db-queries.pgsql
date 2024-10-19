CREATE TABLE "User"(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(45) NOT NULL,
    profile VARCHAR(255) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    contact_number VARCHAR(15) UNIQUE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    country VARCHAR(45) NOT NULL,
    region VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isHost BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE Host(
    user_id INT PRIMARY KEY,            -- user_id as the primary key (one-to-one relationship with User)
    education VARCHAR(100),
    spoken_languages TEXT,              -- Store multiple languages as a text string or JSON array
    profession VARCHAR(100),
    date_of_birth DATE,
    bio varchar(5000),
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);



CREATE TABLE Role (
    role_id SERIAL PRIMARY KEY,       -- Auto-incrementing ID for each role entry
    user_id INT NOT NULL,             -- Foreign key referencing User
    role VARCHAR(50) NOT NULL,        -- Role name (e.g., 'Host', 'Guest', 'Admin')
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Homestays (
    homestay_id SERIAL PRIMARY KEY,      
    user_id INT NOT NULL,
    title VARCHAR(245) NOT NULL,
    images JSONB NOT NULL,
    dzongkhag VARCHAR(45) NOT NULL,
    gewog VARCHAR(45) NOT NULL,
    latitude VARCHAR(45) NOT NULL,
    longitude VARCHAR(45) NOT NULL,          
    facilities JSONB NOT NULL, 
    check_in  TIME NOT NULL,   
    check_out  TIME NOT NULL,   
    rate  INT NOT NULL,   
    rules  JSONB,
    accomodation INT NOT NULL,
    description VARCHAR(5000) NOT NULL,
    numreviews INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    isAvaliable BOOLEAN NOT NULL DEFAULT TRUE,  
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,      
    user_id INT NOT NULL, 
    homestay_id INT NOT NULL,            
    review VARCHAR(1000) NOT NULL,
    rating INT NOT NULL,     
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id) ON DELETE CASCADE
);


DROP TABLE "User";
DROP TABLE Host;
DROP TABLE Homestays;
DROP TABLE Role;
DROP TABLE Reviews;

-- Added password field to user table
ALTER TABLE "User"
ADD COLUMN password VARCHAR(255) NOT NULL; 

-- Add profile field to user table
ALTER TABLE "User"
ADD COLUMN profile VARCHAR(255) NOT NULL; 

-- Add images filed to Homestay table
ALTER TABLE Homestays
ADD COLUMN images TEXT NOT NULL; 

-- Add numReviews field
ALTER TABLE Homestays
ADD COLUMN numReviews INT DEFAULT 0; 

-- Add rating field
ALTER TABLE Homestays
ADD COLUMN rating DECIMAL(3,2) DEFAULT 0.00; 

-- Add title field
ALTER TABLE Homestays
ADD COLUMN title VARCHAR(245) NOT NULL; 

ALTER TABLE Homestays
ADD COLUMN description VARCHAR(5000) NOT NULL; 

DELETE FROM "User";
DELETE FROM Homestays;

SELECT * FROM "User";
SELECT * FROM homestays;
SELECT * FROM Host;
SELECT * FROM Reviews;
