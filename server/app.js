const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const { MONGOURI } = require('./config/keys');
const cors = require('cors');
const bodyParser = require('body-parser');

// database connection
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected...");
});

mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error...", err);
})

// cors
app.use(cors());

// parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to Redgold!");
})


// auth routes
app.use("/api/auth", require('./routes/auth'));

// profile routes
app.use("/api/profile", require('./routes/profile'));

// blood routes
app.use("/api/blood", require('./routes/blood'));

// booking routes
app.use("/api/booking", require('./routes/booking'));

// appointment routes
app.use("/api/appointment", require('./routes/appointment'));


// server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));