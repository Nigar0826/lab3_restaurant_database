const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    restaurant_id: String,
    name: String,
    cuisines: String,
    city: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
