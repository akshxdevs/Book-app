import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../styles/LikedProduct.css";

export const LikedProducts = () => {
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        fetchLikedProducts();
    }, []);

    const fetchLikedProducts = async () => {
        try {
            const userId  =localStorage.getItem("userId");
            console.log(userId);
            const response = await fetch(`http://localhost:3000/auth/likedBook/user/${userId}`,{
                method:"GET",
                headers:{"Content-Type": "application/json"},
            });
            if (!response.ok) {
                throw new Error("Failed to fetch liked products");
            }
            const data = await response.json();
            console.log(data);
            setLikedProducts(data);
        } catch (error) {
            console.error("Error fetching liked products",error);
        }
    };

    const handleRemoveItem = async (bookId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to remove this recipe from favorites?");
            if (!confirmed) return;

            const response = await fetch(`http://localhost:3000/auth/removeLiked/${bookId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to remove item from liked products");
            }

            toast.success("Removed successfully");
            window.location.href="/favoritebooks" 
        } catch (error) {
            console.error("Error removing item from liked products:", error);
        }
    };
    
    return (
        <div className="likedBooks">
            <h2 className="likedbooks-h2">Favorites</h2>
            <ul>
                {likedProducts.map((product) => (
                    <li key={product._id} className="list">
                        <div>
                            <h3 className="likedbooks-h3">{product.title}</h3>
                            <h4 className="likedbooks-h4">{product.author}</h4>
                            <p className="likedbooks-p">{product.about}</p>
                            <img className="likedbooks-img" src={product.imgUrl} alt={product.title} />
                            <button className="remove-item-button" onClick={() => handleRemoveItem(product._id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer/>
        </div> 
    );
};
