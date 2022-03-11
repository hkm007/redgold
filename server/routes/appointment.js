const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { getAllAppointment, newAppointment, deleteAppointment } = require('../controllers/appointment');


router.get("/all", requireLogin, getAllAppointment);
router.post("/new", requireLogin, newAppointment);
router.delete("/delete/:appointmentId", requireLogin, deleteAppointment);

module.exports = router;