const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;

        const order = new Order({
            userId,
            items,
            totalPrice,
            status: "preparing"
        });

        await order.save();

        res.json({
            message: "Order Placed",
            order: {
                id: order._id.toString(),
                userId: order.userId,
                items: order.items,
                totalPrice: order.totalPrice,
                status: order.status,
                date: order.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.json(orders.map(order => ({
            id: order._id.toString(),
            userId: order.userId,
            items: order.items,
            totalPrice: order.totalPrice,
            status: order.status,
            date: order.createdAt
        })));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();

        res.json(orders);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;