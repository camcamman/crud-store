const mongoose = require('mongoose');
const Schema = mongoose.Schema

// main().catch(err => console.log(err));

const InventorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: Number
})

module.exports = mongoose.model("InventoryDB", InventorySchema)