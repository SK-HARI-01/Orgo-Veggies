import Showproduct from './Showproduct';
import Cart from './Cart';
import { useState, useEffect } from 'react';
import Homepage from './Homepage';
import './Toppage.css';
import Logo from './assets/ovlogo1.png';
import ScrollButtons from './ScrollButtons';

function Toppage() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all"); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [isScrolled, setIsScrolled] = useState(false);

    const openCart = () => setShowCart(true);
    const closeCart = () => setShowCart(false);

    // Hide Homepage if searchQuery is used, a category is selected, or page is scrolled
    const hideHomepage = searchQuery.length > 0 || selectedCategory !== "all" ;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div className="top-elements fixed-top">
                <img src={Logo} alt="Orgoveggies logo" className="page-logo" />
                <div>
                {/* Search Bar */}
                <input 
                    type="text" 
                    placeholder="Search for products..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />

                {/* Dropdown for category selection */}
                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-dropdown"
                >
                    <option value="all">All</option>
                    <option value="vegetable">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dryfruits">Dry Fruits</option>
                </select>

                <button onClick={openCart} className="cart-button" style={{ marginRight: "30px" }}>Go to Cart</button>
            </div>
            </div>
            <div><br></br></div>

            {!hideHomepage && <Homepage />}
            
            {/* Pass category and searchQuery to filter products */}
            <Showproduct cart={cart} setCart={setCart} type={selectedCategory} searchQuery={searchQuery} />

            {showCart && <Cart cart={cart} updateCart={setCart} onClose={closeCart} />}
            <ScrollButtons />
        </div>
    );
}

export default Toppage;
