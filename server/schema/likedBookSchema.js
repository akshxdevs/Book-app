const mongoose = require("mongoose");

const LikedBooks = new mongoose.Schema({
    UserId:String,
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

const Liked = mongoose.model("LikedBooks",LikedBooks);

module.exports = Liked;