const getUserByEmailQuery= `SELECT * FROM "User" WHERE email = $1;`;
const createUserQuery= `INSERT INTO "User" (full_name, email, contact_number, gender, country, region, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
const getUserByIdQuery= `SELECT user_id,full_name, email, contact_number, gender, country, region, profile, ishost FROM "User" WHERE user_id = $1;`;

export {getUserByEmailQuery, createUserQuery, getUserByIdQuery};