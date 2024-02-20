const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Header'));

mongoose
    .connect("mongodb+srv://jayprojj:jay%401212@cluster0.6mdfvv7.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const healthdata = new mongoose.Schema({
    Id: String,
    temperature: String,
    spo2: String,
    pulse_rate: String,
    fall_detected: String
});


app.post("/add", async (req, res) => {
    const { Id, temperature, spo2, pulse_rate, fall_detected } = req.body;

    // const requiredFields = ['id', 'bloodgrp', 'Rh', 'DOC', 'days', 'DOE', 'Quantity', 'name', 'age', 'gender', 'weight', 'number'];
    // if (requiredFields.some(field => !req.body[field])) {
    //     return res.status(400).json({ error: 'Missing or empty required fields' });
    // }

    const data = {
        Id: Id,
        temperature: temperature,
        spo2: spo2,
        pulse_rate: pulse_rate,
        fall_detected: fall_detected,
    };

    try {
        const check = await health_data.findOne({ Id: Id });

        if (check) {
            res.json("ID ALREADY EXIST");
        } else {
            const result = await health_data.create(data);
            console.log(result);
            res.json("ADDED");
        }
    } catch (e) {
        console.error(e);
        res.json("fail");
    }
});



const health_data = mongoose.model("health_data", healthdata);





app.get("/data", async (req, res) => {
    try {
        const data = await health_data.find();
        res.json(data);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
