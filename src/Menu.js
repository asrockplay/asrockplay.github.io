import React, { useState, useEffect } from 'react';
import './menu.css'; // Импортируем файл CSS

function Menu() {
    const [menuData, setMenuData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('DÖNER');
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [showConfigMenu, setShowConfigMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openSections, setOpenSections] = useState({ sossen: false, zutaten: false, sizes: false });

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('/menu.json');
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    const handleCategoryClick = (category) => {
        if (category !== selectedCategory) {
            setSelectedCategory(category);
        }
    };

    const handleSizeChange = (itemName, newSize) => {
        setSelectedSizes({
            ...selectedSizes,
            [itemName]: newSize
        });
    };

    const handleQuantityChange = (itemName, newQuantity) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [itemName]: newQuantity
        });
    };

    const handleAddToCart = (itemName) => {
        console.log(`Added to cart: ${itemName}`);
        setShowConfigMenu(false);
        enableBodyScroll();
    };

    const getPrice = (item) => {
        if (selectedCategory !== 'PIZZA' || !item.hasOwnProperty('sizes')) {
            return item.price || 0;
        }

        const selectedSize = selectedSizes[item.name] || item.sizes[0].size;
        const sizeObj = item.sizes.find(size => size.size === selectedSize);
        return sizeObj ? sizeObj.price : item.sizes[0].price;
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowConfigMenu(true);
        disableBodyScroll();
    };

    const handleCloseConfigMenu = () => {
        setShowConfigMenu(false);
        enableBodyScroll();
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    };

    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className="menu-container">
            <nav className="menu-nav">
                <ul>
                    {menuData && menuData.map(category => (
                        <li key={category.category} onClick={() => handleCategoryClick(category.category)} className={selectedCategory === category.category ? 'active' : ''}>
                            <img src={`/ico/${category.category}.svg`} alt={`${category.category} icon`} />
                            {category.category}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="menu-items">
                {selectedCategory && menuData && (
                    <ul className="selected-category-items">
                        {menuData
                            .find((item) => item.category === selectedCategory)
                            .items.map((item, index) => (
                                <li key={index}>
                                    <div className="item-card">
                                        <div className="edit-label" onClick={() => handleItemClick(item)}>Bearbeiten</div>
                                        <img
                                            src={`/img/${item.name}.jpg`}
                                            alt={item.name}
                                            className="item-image"
                                            onClick={() => handleItemClick(item)}
                                        />
                                        <div className="item-details">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-controls">
                                                {item.sizes && (
                                                    <div className="size-select-wrapper">
                                                        <select
                                                            className="size-select"
                                                            value={selectedSizes[item.name] || item.sizes[0]?.size}
                                                            onChange={(e) => handleSizeChange(item.name, e.target.value)}
                                                        >
                                                            {item.sizes.map((size, idx) => (
                                                                <option key={idx} value={size.size}>
                                                                    {size.size}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="item-price">{getPrice(item)}€</div>
                                            <select className="quantity-select"
                                                value={selectedQuantities[item.name] || 1}
                                                onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                                            >
                                                {Array.from({ length: 10 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="add-to-cart-button"
                                                onClick={() => handleAddToCart(item.name)}
                                            >
                                                AUSWAHL
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <div className="order-details">
                <h2>Order Details</h2>
            </div>

            {showConfigMenu && selectedItem && (
                <div className="config-menu" onClick={handleCloseConfigMenu}>
                    <div className="config-menu-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseConfigMenu}>X</button>
                        <img
                            src={`/img/${selectedItem.name}.jpg`}
                            alt={selectedItem.name}
                            className="config-item-image"
                        />
                        <div className="config-item-details">
                            <div className="config-section-wrapper">
                                <h2>{selectedItem.name}</h2>
                                <p className="config-item-price">{getPrice(selectedItem)}€</p>
                                <p className="config-item-description">Beschreibung hier. Z.b zutaten u.s.w.</p>
                            </div>
                            {selectedItem.sizes && (
                                <div className="config-section-wrapper">
                                    <div className="config-section-header" onClick={() => toggleSection('sizes')}>
                                        <h3>Größe:</h3>
                                        <span className={`arrow ${openSections.sizes ? 'down' : 'right'}`}></span>
                                    </div>
                                    {openSections.sizes && (
                                        <select
                                            className="size-select"
                                            value={selectedSizes[selectedItem.name] || selectedItem.sizes[0].size}
                                            onChange={(e) => handleSizeChange(selectedItem.name, e.target.value)}
                                        >
                                            {selectedItem.sizes.map((size, idx) => (
                                                <option key={idx} value={size.size}>
                                                    {size.size}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}
                            <div className="config-section-wrapper">
                                <div className="config-section-header" onClick={() => toggleSection('sossen')}>
                                    <h3>Soßen:</h3>
                                    <span className={`arrow ${openSections.sossen ? 'down' : 'right'}`}></span>
                                </div>
                                {openSections.sossen && (
                                    <select className="sauce-select">
                                        <option>Soße 1</option>
                                        <option>Soße 2</option>
                                        <option>Soße 3</option>
                                        <option>Soße 4</option>
                                    </select>
                                )}
                            </div>

                            <div className="config-section-wrapper">
                                <div className="config-section-header" onClick={() => toggleSection('zutaten')}>
                                    <h3>Zutaten:</h3>
                                    <span className={`arrow ${openSections.zutaten ? 'down' : 'right'}`}></span>
                                </div>
                                {openSections.zutaten && (
                                    <select className="toppings-select" multiple>
                                        <option>Zusatzstoff 1</option>
                                        <option>Zusatzstoff 2</option>
                                        <option>Zusatzstoff 3</option>
                                        <option>Zusatzstoff 4</option>
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className="config-footer">
                            <select
                                className="config-quantity-select"
                                value={selectedQuantities[selectedItem.name] || 1}
                                onChange={(e) => handleQuantityChange(selectedItem.name, e.target.value)}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="config-add-to-cart-button"
                                onClick={() => handleAddToCart(selectedItem.name)}
                            >
                                AUSWAHL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
