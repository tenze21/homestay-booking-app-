
// retrieve homestay detail from database
const getHomestayDetailQuery = `SELECT 
    U.full_name,
    U.profile,
    U.email,
    U.contact_number,
    H.education,
    H.spoken_languages,
    H.profession,
    H.date_of_birth,
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

export {getHomestaysQuery, getHomestayDetailQuery};