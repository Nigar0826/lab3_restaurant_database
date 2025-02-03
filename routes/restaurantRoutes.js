const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// 1. Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get restaurants by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisines: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get restaurants sorted by restaurant_id
router.get('/sortBy', async (req, res) => {
    try {
        const sortDirection = req.query.sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}, { _id: 1, cuisines: 1, name: 1, city: 1, restaurant_id: 1 })
            .sort({ restaurant_id: sortDirection });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get restaurants where cuisines are 'Delicatessen' and city is not 'Brooklyn'
router.get('/Delicatessen', async (req, res) => {
    try {
        console.log("Fetching Delicatessen restaurants...");
        
        const restaurants = await Restaurant.find(
            { cuisines: 'Delicatessen', city: { $ne: 'Brooklyn' } },
            { _id: 0, cuisines: 1, name: 1, city: 1 }
        ).sort({ name: 1 });

        console.log("Found:", restaurants);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
