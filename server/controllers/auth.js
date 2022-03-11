const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

exports.register = async (req, res) => {
    const { name, phone, address, email, password } = req.body;

    if(!email || !password || !name || !phone || !address){
        return res.status(422).json({ error: "All fields are mandatory!" })
    }

    User.findOne({ email: email })
    .then((savedUser) => {
        if(savedUser) {
            return res.status(422).json({ error: "User already exists with that email!" });
        }

        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                name,
                phone,
                address,
                email,
                password: hashedpassword
            });
    
            user.save()
            .then(user => {
                res.json({ message: "Account created!" });
            })
            .catch(err => {
                res.json({ error: "Something went wrong!" });
                console.log(err);
            })
        })
    })
    .catch(err => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
       return res.status(422).json({ error: "Invalid credentials!" });
    }

    await User.findOne({ email: email })
    .then(savedUser => {
        if(!savedUser) {
           return res.status(422).json({ error: "Invalid credentials!" });
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
               const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
               res.json({token, userId: savedUser._id, isAdmin: savedUser.isAdmin});
            }
            else {
                return res.status(422).json({ error: "Invalid credentials!" });
            }
        })
        .catch(err => {
            return res.status(422).json({ error: "Invalid credentials!" });
            console.log(err);
        })
    })
}
