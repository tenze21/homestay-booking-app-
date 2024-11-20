import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
import homestays from "./data/homestays.js";
import users from "./data/users.js";
import hosts from "./data/hosts.js";
import reviews from "./data/reviews.js";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres_admin",
  host: "dpg-cstksk68ii6s73fk03ng-a.singapore-postgres.render.com",
  database: "homestay_booking_db_38e8",
  password: "05UmSVlEKiRZAvi0lNouZgSsOQh9iBrf",
  connectionString: `postgresql://postgres_admin:05UmSVlEKiRZAvi0lNouZgSsOQh9iBrf@dpg-cstksk68ii6s73fk03ng-a.singapore-postgres.render.com/homestay_booking_db_38e8?ssl=true`,
  port: 5432,
});

const insertUser = async () => {
  const query = `INSERT INTO "User" (full_name, email, contact_number, gender, country, region, password, ishost, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  try {
    for (const user of users) {
      await pool.query(query, [
        user.full_name,
        user.email,
        user.contact_number,
        user.gender,
        user.country,
        user.region,
        user.password,
        user.isHost,
        user.profile
      ]);
    }
    console.log("users inserted successfully");
  } catch (err) {
    console.error("error inserting users: ", err);
  }
};
// insertUser();

const insertHomestays = async () => {
  const query = `INSERT INTO Homestays (user_id, dzongkhag, gewog, latitude, longitude, facilities, check_in, check_out, rate, rules, accomodation, isAvaliable, images, numReviews, rating, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;

  try {
    for (const homestay of homestays) {
      await pool.query(query, [
        homestay.user_id,
        homestay.dzongkhag,
        homestay.gewog,
        homestay.latitude,
        homestay.longitude,
        homestay.facilities,
        homestay.check_in,
        homestay.check_out,
        homestay.rate,
        homestay.rules,
        homestay.accomodation,
        homestay.isAvailable,
        homestay.images,
        homestay.numReviews,
        homestay.rating,
        homestay.title,
        homestay.description,
      ]);
    }
    console.log("homestays inserted successfully");
  } catch (err) {
    console.error("erro inserting homestays: ", err);
  }
};
insertHomestays();

const insertHosts = async () => {
  const query = `INSERT INTO Host (user_id, education, spoken_languages, profession, date_of_birth, account_number, account_holder_name, bank_name, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  try {
    for (const host of hosts) {
      await pool.query(query, [
        host.user_id,
        host.education,
        host.spoken_languages,
        host.profession,
        host.date_of_birth,
        host.account_number,
        host.account_holder_name,
        host.bank_name,
        host.bio,
      ]);
    }
    console.log("hosts inserted successfully");
  } catch (err) {
    console.error("error inserting hosts: ", err);
  }
};
// insertHosts();

const insertReviews = async () => {
  const query = `INSERT INTO Reviews (user_id, homestay_id, review, rating) VALUES ($1, $2, $3, $4)`;

  try {
    for (const review of reviews) {
      await pool.query(query, [
        review.user_id,
        review.homestay_id,
        review.review,
        review.rating,
      ]);
    }
    console.log("reviews inserted successfully");
  } catch (err) {
    console.error("erro inserting review: ", err);
  }
};
// insertReviews();
