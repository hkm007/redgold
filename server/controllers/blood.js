const Blood = require('../models/Blood');

exports.getAllBlood = async (req, res) => {
    try {
        const blood = await Blood.find();
        res.json({ data: blood });
    } catch(err) {
        res.json({ error: "Something went wrong" });
        console.log(err);
    }
}

exports.addBlood = async (req, res) => {
    const { group, price } = req.body;

    if(!group || !price) {
        return res.status(422).json({ error: "All fields are mandatory!" });
    }

    Blood.findOne({ group: group })
    .then((savedBlood) => {
        if(savedBlood) {
            return res.status(422).json({ error: "Blood group already exists!" });
        }

        const blood = new Blood({
            group,
            price
        });
    
        blood.save()
        .then(blood => {
            Blood.find()
            .then(bloods => { 
                res.json({ message: "Blood group added successfully!", data: bloods });
            })
            .catch(err => {
                res.json({ error: "Something went wrong!" });
                console.log(err);
            })
        })
        .catch(err => {
            res.json({ error: "Something went wrong!" });
            console.log(err);
        })
    })
    .catch(err => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
    })
}

exports.deleteBlood = async (req, res) => {
    const bloodId = req.params.bloodId;

    Blood.findById(bloodId)
    .then(blood => {
        if(blood) {
            blood.remove()
            .then(blood => {
            	Blood.find()
	            .then(bloods => { 
	                res.json({ message: "Blood group deleted!", data: bloods });
	            })
	            .catch(err => {
	                res.json({ error: "Blood group deleted! Refresh to get the new data!" });
	                console.log(err);
	            })
            })
            .catch(err => {
                res.json({ error: "Something went wrong!" });
                console.log(err);
            })
        } else {
            res.json({ error: "Blood group doesn't exists!" });
        }
    })
    .catch(err => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
    })
}