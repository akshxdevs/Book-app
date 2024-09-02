const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author: [String],
    about:{
        type:String,
        required:true,
    },
    imgUrl: String,
});

const Book = mongoose.model("Book",BookSchema);

module.exports = Book;