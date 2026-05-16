const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(
  cors({
    origin: "https://ajj-kia-khayein.vercel.app",
    credentials: true
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Food Delivery Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});