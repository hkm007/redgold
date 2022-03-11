const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { getAllBooking, newBooking, deleteBooking } = require('../controllers/booking');


router.get("/all", requireLogin, getAllBooking);
router.post("/new", requireLogin, newBooking);
router.delete("/delete/:bookingId", requireLogin, deleteBooking);

module.exports = router;