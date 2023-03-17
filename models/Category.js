const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId}= mongoose.Schema.Types;

const categorySchema= new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:[true, "please provide a category name"],
        lowercase: true,
        unique: true
    },
    description: String,
    imageUrl:{
        type: String,
        validate: [validator.isURL,'please provide a valid ImageUrl']
    }
},{
    timestamps: true
})

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;