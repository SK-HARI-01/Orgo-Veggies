import React, { useState } from 'react';
import './Product.css';
import { vegetablesList, fruitsList, mixedfruitList } from './ProductData'; 

function Showproduct({ cart, setCart, type, searchQuery }) {
    const [buttonTexts, setButtonTexts] = useState({});

    const addToCart = (product) => {
        setButtonTexts((prev) => ({ ...prev, [product.id]: 'Added!' }));

        setCart((prevCart) => {
            const exists = prevCart.find((item) => item.id === product.id);
            if (exists) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });

        setTimeout(() => {
            setButtonTexts((prev) => ({ ...prev, [product.id]: 'Add to Cart' }));
        }, 3000);
    };

    // Function to get filtered products based on type & search query
    const getFilteredProducts = (products) => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const renderProducts = () => {
        switch (type) {
            case "all":
                return (
                    <>
                        {renderSection("Vegetables", getFilteredProducts(vegetablesList))}
                        {renderSection("Fruits", getFilteredProducts(fruitsList))}
                        {renderSection("Dry Fruits", getFilteredProducts(mixedfruitList))}
                    </>
                );
            case "vegetable":
                return renderSection("Vegetables", getFilteredProducts(vegetablesList));
            case "fruits":
                return renderSection("Fruits", getFilteredProducts(fruitsList));
            case "dryfruits":
                return renderSection("Dry Fruits", getFilteredProducts(mixedfruitList));
            default:
                return <p>No products available.</p>;
        }
    };

    const renderSection = (title, list) => {
        if (list.length === 0) return <p>No {title.toLowerCase()} found.</p>;

        return (
            <div className={title.toLowerCase().replace(/\s+/g, '-')}>
                <div className='header-container'>
                <h2>{title}</h2>
                </div>
                <div className="grid-container">
                    {list.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.img} alt={product.name} />
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p><b>Price: Rs.{product.price}</b></p>
                            <button onClick={() => addToCart(product)}>
                                {buttonTexts[product.id] || 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
                 <div><br></br></div>
            </div>
           
        );
    };

    return (
        <div className="product-container">
            <h1>Our Fresh Organic Products</h1>
            {renderProducts()}
        </div>
    );
}

export default Showproduct;
