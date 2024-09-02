import "../styles/Books.css";
import "../styles/SearchBar.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import { Navbar } from "./Navbar";
export const Books = () => {
    const [books,setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
      getBooks();
    },[]);
    
    const getBooks = () => {
      fetch("http://localhost:3000/auth/book",
        {
          method: "GET",
          headers:{
            Authorization : `${localStorage.getItem("token")}`,
          },
        }).then((response)=>{
          if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        return response.json(); 
        })
        .then((data)=>{
          setBooks(data);
        })
        .catch((err)=>{
          console.error(err);
        }) 
    }
    const handleDeleteBooks = async (bookId) => {
      try {
        const response = await fetch(`http://localhost:3000/auth/book/${bookId}`, {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Book deleted successfully");
        window.location.href="/books" 
      }else {
          toast.error("Failed to delete book");
          getBooks();
      }
    }catch (error) {
      toast.error("An error occurred while deleting the book:", error);
    }
  }
  
  const handleAddToFavorites = async (bookId) => {
    try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:3000/auth/likedBook/${bookId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ UserId: userId }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            toast.success("Successfully added to favorites ❤️");
        } else {
          toast.warn("Book already exists in your favorites");
        }
    } catch (error) {
        toast.error("An error occurred while adding the book to favorites:", error);
    }
};



    const searchBooks = async(e) => {
      try {
        if(e.target.value){
          let searchBooks = await fetch(`http://localhost:3000/auth/searchBooks/${e.target.value}`,
          {
            method:"GET",
            headers:{"Content-Type":"application/json"},    
          }
        );
        searchBooks = await searchBooks.json();
        if (!searchBooks.message) {
          setBooks(searchBooks);
        }else{
          setBooks([]);
        }
      }else{
        getBooks();
      }
      } catch (error) {
       console.log(error.message); 
      }
    }
    return (
      
        <div className="Books">
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search books.." onChange={(e) => searchBooks(e)} />
            </div>
            {books.length > 0 ?(
                books.map((book)=>(
                <div key={book._id} className="Book">
                   <h2 className="book-h2">{book.title}</h2>
                   <h3 className="book-h3">{book.author}</h3>
                   <img className="book-img" src={book.imgUrl} alt={book.title} />
                   <h4 className="book-h4">{book.about}</h4> 
                  <button className="delete-button" onClick={() => handleDeleteBooks(book._id)}>🗑️</button>
                  <button className="add-to-favorites-button"onClick={() => handleAddToFavorites(book._id)}>❤️</button>
                </div>
            ))
        ) : (
            <h2 className="no-books">No Books Found!!＞﹏＜</h2>
        )}
        <Navbar/>
        <ToastContainer/> 
        </div>

    );  
}