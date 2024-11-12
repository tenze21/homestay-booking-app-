const getUserByEmailQuery = `SELECT * FROM "User" WHERE email = $1;`;
const createUserQuery = `INSERT INTO "User" (full_name, email, contact_number, gender, country, region, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
const getUserByIdQuery = `SELECT user_id,full_name, email, contact_number, gender, country, region, profile, ishost FROM "User" WHERE user_id = $1;`;
const createHostQuery = `INSERT INTO Host (user_id, education, spoken_languages, profession, date_of_birth, account_number, account_holder_name, bank_name, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
const updateUserRoleQuery = `UPDATE "User" SET ishost = $1 WHERE user_id = $2 RETURNING *;`;
const getUserDetailsQuery = `SELECT full_name, profile, email, contact_number, gender, country, region, ishost, education, spoken_languages, profession, date_of_birth, account_number, account_holder_name, bank_name, bio FROM "User" u LEFT JOIN Host h ON u.user_id = h.user_id WHERE u.user_id = $1;`;
const updateUserDetailQuery=`UPDATE "User" SET full_name = $1, profile = $2, email=$3, contact_number = $4, gender = $5, country = $6, region = $7 WHERE user_id = $8 RETURNING *;`;
const updateHostDetailQuery=`UPDATE Host SET education = $1, spoken_languages = $2, profession = $3, date_of_birth = $4, account_number = $5, account_holder_name = $6, bank_name = $7, bio = $8 WHERE user_id = $9 RETURNING *;`;
const getUserProfileQuery=`SELECT profile FROM "User" WHERE user_id = $1;`;
const getUserPasswordQuery= `SELECT password FROM "User" WHERE user_id = $1;`;
const updatePasswordQuery=`UPDATE "User" SET password = $1 WHERE user_id = $2 RETURNING *;`;
const getUserReservationsQuery= `SELECT r.*, h.title FROM Reservations r JOIN Homestays h ON r.homestay_id = h.homestay_id WHERE r.user_id = $1;`;
const deleteHostQuery= `DELETE FROM Host WHERE user_id = $1;`;


export {
  getUserByEmailQuery,
  createUserQuery,
  getUserByIdQuery,
  createHostQuery,
  updateUserRoleQuery,
  getUserDetailsQuery,
  updateUserDetailQuery,
  updateHostDetailQuery,
  getUserProfileQuery,
  getUserPasswordQuery,
  updatePasswordQuery,
  getUserReservationsQuery,
  deleteHostQuery
};
