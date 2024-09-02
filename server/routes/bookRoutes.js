const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/middleware");
const Book = require("../schema/bookSchema");
const Liked = require("../schema/likedBookSchema");
const User = require("../schema/userSchema"); 

router.post("/book", async(req,res) => {
  try {
      const {title,author,about,imgUrl} = req.body;

      const newBook = await Book.create({
          title,
          author,
          about,
          imgUrl,
      });

      res.status(201).json(newBook);
  } catch (error) {
      console.error(error);
      res.status(500).json({error:"Internal Server Error!!"});
  }
});

router.get("/book",async (req,res )=>{
  try {
    const getAllbooks = await Book.find();
    res.status(200).json(getAllbooks);
  } catch (error) {
    console.log("INternal server Error!!",error);
  }
} )



router.delete("/book/:id", async (req,res) => {
  try {
      const bookId = req.params.id;
      const deleteBook = await Book.deleteOne({_id:bookId});

      if (!deleteBook.deletedCount) {
          return res.status(404).json({ error: "Book not found" });  
      }
      res.status(200).json({message:"Deleted sucessfully"});

  } catch (error) {
      console.error(error);
      res.status(500).json({error:"Internal server error"})
  }
});


router.get("/likedBook/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Liked.find({ UserId: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }else{
      const getUserLikedBooks = await Liked.find({ UserId: userId }, { title: 1, author: 1, imgUrl: 1 });
      if (getUserLikedBooks) {
        return res.status(200).json(getUserLikedBooks);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/likedBook/:id", async (req, res) => {
  try {
    let book = await Book.findOne({ _id: req.params.id });

    const existingFavorite = await Liked.findOne({ title: book.title, userId: req.body.userId });

    if (existingFavorite) {
      return res.status(400).json({ error: "Book already exists in your favorites" });
    } else {
      const { title, author, about, imgUrl } = book;
      const { UserId } = req.body;
      const newFavorite = await Liked.create({
        title,
        author,
        about,
        imgUrl,
        UserId
      });
      res.status(201).json(newFavorite);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});



router.delete("/removeLiked/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Use findOneAndDelete to delete the document and get the result
    const deleteLikedBook = await Liked.findOneAndDelete({ _id: bookId });
    
    // If no document is deleted, send 404 error
    if (!deleteLikedBook) {
      return res.status(404).json({ error: "Liked Book not found" });
    }
    
    // If deletion is successful, send 200 status with success message
    res.status(200).json({ message: "Removed successfully!!" });
  } catch (error) {
    // If an error occurs, send 500 status with error message
    res.status(500).json({ error: "Internal server error", details: error });
  }
});



router.get("/searchBooks/:key", async (req,res) => {
  try {
    const book = await Book.find({
      title: {$regex : new RegExp(req.params.key,"i")},
    })
    if (book.length === 0) {
      return res.status(404).json({ message: ` ${book} not found` });
      
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal server error"});
  }
});

module.exports = router;
