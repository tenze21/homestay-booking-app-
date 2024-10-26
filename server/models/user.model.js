const getUserByEmailQuery= `SELECT * FROM "User" WHERE email = $1;`;
const createUserQuery= `INSERT INTO "User" (full_name, email, contact_number, gender, country, region, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
const getUserByIdQuery= `SELECT user_id,full_name, email, contact_number, gender, country, region, profile, ishost FROM "User" WHERE user_id = $1;`;
const createHostQuery= `INSERT INTO Host (user_id, education, spoken_languages, profession, date_of_birth, account_number, account_holder_name, bank_name, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
const updateUserRoleQuery= `UPDATE "User" SET ishost = $1 WHERE user_id = $2 RETURNING *;`;

export {getUserByEmailQuery, createUserQuery, getUserByIdQuery, createHostQuery, updateUserRoleQuery};