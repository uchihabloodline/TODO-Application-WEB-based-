const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    }
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;