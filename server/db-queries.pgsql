CREATE TABLE "User"(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    profile VARCHAR(255) NOT NULL DEFAULT "/images/user/default-profile.jpg",
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_number VARCHAR(15) UNIQUE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    country VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isHost BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- include a account number and account name field, change spokenlanguages data type to JSONB
CREATE TABLE Host(
    user_id INT PRIMARY KEY,            -- user_id as the primary key (one-to-one relationship with User)
    education VARCHAR(100),
    spoken_languages JSONB,              -- Store multiple languages as a text string or JSON array
    profession VARCHAR(100),
    date_of_birth DATE,
    account_number INT NOT NULL,
    account_holder_name VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
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
    numreviews INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    isAvaliable BOOLEAN NOT NULL DEFAULT TRUE,  
    description VARCHAR(5000) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Reservations(
    reservation_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    homestay_id INT NOT NULL,
    num_guests INT NOT NULL,
    arrival_date date NOT NULL,
    num_days INT NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    total_payment INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'No show')) DEFAULT 'Pending',
    isPaid BOOLEAN NOT NULL DEFAULT FALSE,
    paidAt DATE,
    isPaidAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (homestay_id) REFERENCES homestays(homestay_id) ON DELETE CASCADE
);
DROP TABLE reservations;

CREATE TABLE Payment_details(
    payment_id CHAR(17) PRIMARY KEY,
    reservation_id INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    update_time VARCHAR(55) NOT NULL,
    email VARCHAR(255) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE
);
DROP TABLE payment_details;

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,      
    user_id INT NOT NULL, 
    homestay_id INT NOT NULL,            
    review VARCHAR(1000) NOT NULL,
    rating INT NOT NULL,     
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id) ON DELETE CASCADE
);

CREATE TABLE Payment_details_admin(
    Payment_id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    total_amount INT NOT NULL,
    amount_deducted INT NOT NULL,
    amount_paid INT NOT NULL,
    paid_at date NOT NULL,
    transaction_id INT NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE
);
DROP TABLE payment_details_admin;

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

ALTER TABLE Reservations
ADD COLUMN status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'No show')) DEFAULT 'Pending'; 

ALTER TABLE Reservations
ADD COLUMN isPaidAdmin BOOLEAN NOT NULL DEFAULT FALSE; 

ALTER TABLE Reservations
ADD COLUMN paidAt DATE;


ALTER TABLE "User"
ALTER COLUMN profile SET DEFAULT '/images/user/default-profile.jpg'; 

ALTER TABLE reservations
ALTER COLUMN arrival_date TYPE DATE;


DELETE FROM "User" WHERE user_id=20;
DELETE FROM Homestays WHERE homestay_id=17;

ALTER TABLE Reservations
ALTER COLUMN total_payment TYPE DECIMAL(10, 2);

DELETE FROM reservations WHERE reservation_id<=3;
DELETE FROM host WHERE user_id=11;
UPDATE "User" SET ishost=FALSE WHERE user_id=8;

SELECT * FROM "User";
SELECT * FROM homestays;
SELECT * FROM Host;
SELECT * FROM Reviews;
SELECT * FROM Reservations;
SELECT * FROM Payment_details;

DELETE FROM HOST WHERE user_id=8;

SELECT profile FROM "User" WHERE user_id = 20;