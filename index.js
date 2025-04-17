require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_URL = "https://smmgen.com/api/v2"; // এটা তোর API URL হবে

app.get("/custom-api", async (req, res) => {
    const { order_id, service } = req.query;
    if (!order_id || !service) return res.status(400).json({ error: "Missing parameters!" });

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: process.env.API_KEY,
                action: "status",
                order: order_id
            }
        });

        const data = response.data;
        res.json({
            "অর্ডার আইডি": data.order,
            "অবস্থা": data.status,
            "শুরুর সংখ্যা": data.start_count,
            "বাকি": data.remains
        });
    } catch (error) {
        res.status(500).json({ error: "API call failed!" });
    }
});

module.exports = app;