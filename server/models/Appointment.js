const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: new Date(new Date().getTime()+(3*24*60*60*1000))
    }
})

module.exports = mongoose.model('appointment', AppointmentSchema);