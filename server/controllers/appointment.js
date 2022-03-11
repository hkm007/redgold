const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.getAllAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        .sort({date: -1})
        .populate('user', ['name', 'phone', 'address'])
        .exec((err, data) => {
            if(!err) {
                res.json({ data });
            } else {
                res.json({ message: 'Something went wrong' });
                console.log(err);
            }
        });
    } catch(err) {
        res.json({ error: "Something went wrong" });
        console.log(err);
    }
}

exports.newAppointment = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if(!user) {
        return res.json({ error: "Invalid request!" });
    }

    const appointment = new Appointment({
        user
    });

    appointment.save()
    .then(appointment => {
        Appointment.find()
        .sort({date: -1})
        .populate('user', ['name', 'phone', 'address'])
        .exec((err, data) => {
            if(!err) {
                res.json({ message: "Appointment initiated!", data });
            } else {
                res.json({ message: 'Appointment initiated! Please refresh!' });
                console.log(err);
            }
        });
    })
    .catch(err => {
        res.json({ error: "Something went wrong" });
        console.log(err);
    })
}

exports.deleteAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    Appointment.findById(appointmentId)
    .then(appointment => {
        if(appointment) {
            appointment.remove()
            .then(appointment => {
            	Appointment.find()
	            .sort({date: -1})
	            .populate('user', ['name', 'phone', 'address'])
	            .exec((err, data) => {
	                if(!err) {
	                    res.json({ message: "Appointment cancelled!", data });
	                } else {
	                    res.json({ message: 'Appointment cancelled! Please refresh!' });
	                    console.log(err);
	                }
	            });
            })
			.catch(err => {
			    res.json({ error: "Something went wrong!" });
			    console.log(err);
			})
        } else {
            res.json({ error: "Appointment already cancelled!" });
        }
    })
    .catch(err => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
    })
}