const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { getProfile, updateProfile } = require('../controllers/profile');

router.get("/:userId", requireLogin, getProfile);
router.put("/update/:userId", requireLogin, updateProfile);

module.exports = router;