const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { addBlood, getAllBlood, deleteBlood } = require('../controllers/blood');


router.get("/all", requireLogin, getAllBlood);
router.post("/add", requireLogin, addBlood);
router.delete("/delete/:bloodId", requireLogin, deleteBlood);

module.exports = router;