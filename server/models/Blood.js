const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('blood', BloodSchema);