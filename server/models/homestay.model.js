// retrieve homestay detail from database
const getHomestayDetailQuery = `SELECT 
    U.user_id,
    U.full_name,
    U.profile,
    U.email,
    U.contact_number,
    H.education,
    H.spoken_languages,
    H.profession,
    H.date_of_birth,
    H.spoken_languages,
    H.bio,
    HS.homestay_id,
    HS.dzongkhag,
    HS.gewog,
    HS.latitude,
    HS.longitude,
    HS.facilities,
    HS.check_in,
    HS.check_out,
    HS.rate,
    HS.rules,
    HS.accomodation,
    HS.isavaliable,
    HS.numreviews,
    HS.rating,
    HS.title,
    HS.images,
    HS.description
FROM 
    "User" U
JOIN 
    Host H ON U.user_id = H.user_id
JOIN 
    Homestays HS ON U.user_id = HS.user_id
WHERE
    HS.homestay_id = $1;`;

// retrieve homestays from database
const getHomestaysQuery = `SELECT * FROM Homestays;`;

// insert homestay into database
const addHomestayQuery = `INSERT INTO Homestays (user_id, title, dzongkhag, gewog, latitude, longitude, facilities, rules, accomodation, check_in, check_out, description, rate, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`;

// get homestay by id
const getHomestayByIdQuery = `SELECT * FROM Homestays WHERE homestay_id = $1;`;

// Update homestay
const updateHomestayQuery = `UPDATE Homestays SET title=$1, images=$2, facilities=$3, check_in=$4, check_out=$5, rate=$6, rules=$7, accomodation=$8, description=$9 WHERE homestay_id=$10 RETURNING *;`;

// get host homestay
const getHostHomeStayQuery = `SELECT * FROM Homestays WHERE user_id = $1;`;

// Delete homestay
const deleteHomestayQuery = `DELETE FROM Homestays WHERE homestay_id = $1;`;

// update homestay availability
const updateAvailabilityQuery= `UPDATE Homestays SET isavaliable=$1 WHERE homestay_id=$2 RETURNING *;`;

// update numReviews and rating 
const updateRatingReviewQuery= `UPDATE Homestays SET rating=$1, numReviews=$2 WHERE homestay_id=$3 RETURNING *;`;

export {
  getHomestaysQuery,
  getHomestayDetailQuery,
  addHomestayQuery,
  getHomestayByIdQuery,
  updateHomestayQuery,
  getHostHomeStayQuery,
  deleteHomestayQuery,
  updateAvailabilityQuery,
  updateRatingReviewQuery
};
