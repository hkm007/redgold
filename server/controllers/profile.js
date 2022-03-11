const User = require('../models/User');

exports.getProfile = async (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
    .then(user => {
        if(user) {
            res.json({ data: user });
        } else {
            res.json({ error: "User doesn't exists!" });
        }
    })
    .catch(err => {
        res.json({ error: "Something went wrong" });
        console.log(err);
    })
}

exports.updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const { phone, address } = req.body;

    User.findById(userId)
    .then(user => {
        if(user) {
            if(phone) user.phone = phone;
            if(address) user.address = address;

            user.save()
            .then(user => {
                res.json({ message: "Profile updated!", data: user });
            })
            .catch(err => {
                res.json({ error: "Something went wrong" });
                console.log(err);
            })
        } else {
            res.json({ error: "User doesn't exists!" });
        }
    })
    .catch(err => {
        res.json({ error: "Something went wrong" });
        console.log(err);
    })
}