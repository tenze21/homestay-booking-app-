const createReviewQuery = `INSERT INTO Reviews (user_id, homestay_id, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;`;
const getReviewsQuery = `SELECT 
    r.*, 
    u.profile, 
    u.full_name, 
    u.country, 
    u.region 
FROM 
    Reviews r
JOIN 
    "User" u ON r.user_id = u.user_id
WHERE 
    r.homestay_id = $1;`;

export { createReviewQuery, getReviewsQuery };
