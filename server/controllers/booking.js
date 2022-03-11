const Booking = require('../models/Booking');
const User = require('../models/User');
const Blood = require('../models/Blood');

exports.getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .sort({date: -1})
        .populate('user', ['name', 'phone', 'address'])
        .exec((err, data) => {
            if(!err) {
                res.json({ data });
            } else {
                res.json({ msg: 'Something went wrong' });
                console.log(err);
            }
        });
    } catch(err) {
        res.json({ error: "Something went wrong" });
        console.log(err);
    }
}

exports.newBooking = async (req, res) => {
    const { userId, bloodId } = req.body;

    const user = await User.findById(userId);
    const blood = await Blood.findById(bloodId);

    if(!user || !blood) {
        return res.json({ error: "Invalid request!" });
    }

    const booking = new Booking({
        user,
        group: blood.group
    });

    booking.save()
    .then(booking => {
        res.json({ message: "Booking completed!" });
    })
    .catch(err => {
        res.json({ error: "Something went wrong" });
        console.log(err);
    })
}

exports.deleteBooking = async (req, res) => {
    const bookingId = req.params.bookingId;

    Booking.findById(bookingId)
    .then(booking => {
        if(booking) {
            booking.remove()
            .then(booking => {
                Booking.find()
                .sort({date: -1})
                .populate('user', ['name', 'phone', 'address'])
                .exec((err, data) => {
                    if(!err) {
                        res.json({ message: "Booking cancelled!", data });
                    } else {
                        res.json({ error: 'Booking cancelled! Please refresh!' });
                        console.log(err);
                    }
                });
            })
            .catch(err => {
                res.json({ error: "Something went wrong!" });
                console.log(err);
            })
        } else {
            res.json({ error: "Booking already cancelled!" });
        }
    })
    .catch(err => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
    })
}