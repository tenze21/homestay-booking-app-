import asyncHandler from "../middleware/asyncHandler.js";
import pool from "../server.js";
import {
  createReservationQuery,
  insertPaymentDetailsQuery,
  updateIsPaidQuery,
  getReservationByIdQuery,
} from "../models/reservation.model.js";
import currencyapi from "@everapi/currencyapi-js";

// @desc create reservation
// @route POST /api/reservation
// @access Private
const createReservation = asyncHandler(async (req, res) => {
  const {
    userId,
    homestayId,
    rate,
    numGuests,
    arrivalDate,
    numDays,
    paymentMethod,
    totalPayment,
  } = req.body;

  const reservation = await pool.query(createReservationQuery, [
    userId,
    homestayId,
    rate,
    numGuests,
    arrivalDate,
    numDays,
    paymentMethod,
    totalPayment,
  ]);
  if (reservation) {
    res.json(reservation.rows[0]);
  } else {
    res.status(400);
    throw new Error("Error creating reservation");
  }
});

// @desc update isPaid to true
// @route PUT /api/reservation/:id
// @access Private
const updateReservationToPaid = asyncHandler(async (req, res) => {
  const reservationId = req.params.id;
  const paidAt= new Date().toISOString();
  const updatedReservation = await pool.query(updateIsPaidQuery, [
   paidAt ,reservationId
  ]);
  if (updatedReservation) {
    res.json(updatedReservation.rows[0]);
  } else {
    res.status(400);
    throw new Error("Error updating reservation");
  }
});

// @desc insert payment details
// @route POST /api/reservation/:id/pay
// @access Private
const insertPaymentDetails = asyncHandler(async (req, res) => {
  const reservationId = req.params.id;
  const paymentId = req.body.id;
  const status= req.body.status;
  const updateTime= req.body.update_time;
  const email= req.body.payer.email_address;
  
  const paymentDetails = await pool.query(insertPaymentDetailsQuery, [
    paymentId,
    reservationId,
    status,
    updateTime,
    email,
  ]);
  if (paymentDetails) {
    res.json(paymentDetails.rows[0]);
  } else {
    res.status(400);
    throw new Error("Error inserting payment details");
  }
});

// @desc get reservation by id
// @route POST /api/reservation/:id
// @access Private
const getReservationById = asyncHandler(async (req, res) => {
  const reservationId = req.params.id;
  const reservation = await pool.query(getReservationByIdQuery, [
    reservationId,
  ]);
  if (reservation && reservation.rows.length > 0) {
    res.json(reservation.rows[0]);
  } else {
    res.status(400);
    throw new Error("Reservation not found");
  }
});

// @desc Get exchange rate
// @route GET /api/reservation/exchangerate
// @access Private
const getExhangeRate = asyncHandler(async (req, res) => {
  const client = new currencyapi(process.env.CURRENCY_CONVERTER_API);
  client
    .latest({
      base_currency: "USD",
      currencies: "BTN",
    })
    .then((response) => {
      const exgrate = response.data.BTN.value;
      res.send({ exgrate });
    });
});

export {
  createReservation,
  insertPaymentDetails,
  updateReservationToPaid,
  getExhangeRate,
  getReservationById,
};
