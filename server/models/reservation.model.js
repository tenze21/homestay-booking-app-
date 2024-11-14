const createReservationQuery = `INSERT INTO Reservations (user_id, homestay_id, rate, num_guests, arrival_date, num_days, payment_method, total_payment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const insertPaymentDetailsQuery = `INSERT INTO Payment_details(payment_id, reservation_id, status, update_time, email) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

const updateIsPaidQuery = `UPDATE Reservations SET isPaid=TRUE, paidat=$1 WHERE reservation_id=$2 RETURNING *`;

const getReservationByIdQuery = `SELECT 
    r.reservation_id,
    r.num_guests,
    r.arrival_date,
    r.num_days,
    r.payment_method,
    r.rate,
    r.total_payment,
    r.isPaid,
    r.status,
    r.ispaidadmin,
    r.paidat,
    h.homestay_id,
    h.title,
    h.dzongkhag,
    h.gewog,
    h.user_id,          
    u.full_name AS host_full_name  
FROM 
    Reservations r
JOIN 
    Homestays h ON r.homestay_id = h.homestay_id
JOIN 
    "User" u ON h.user_id = u.user_id  -- Join to get the host's details
WHERE 
    r.reservation_id = $1`;

// get homestay reservations
const getHomestayReservationsQuery = `
    SELECT *
    FROM Reservations r
    JOIN "User" u ON r.user_id = u.user_id
    WHERE r.homestay_id = $1 AND r.isPaid = TRUE;
`;

// update reservation status
const updateReservationStatusQuery= `UPDATE Reservations SET status=$1 WHERE reservation_id=$2 RETURNING *;`;

export {
  createReservationQuery,
  insertPaymentDetailsQuery,
  updateIsPaidQuery,
  getReservationByIdQuery,
  getHomestayReservationsQuery,
  updateReservationStatusQuery
};
