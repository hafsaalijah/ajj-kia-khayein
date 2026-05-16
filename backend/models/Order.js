const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    totalPrice: Number,
    status: {
        type: String,
        default: "preparing"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);