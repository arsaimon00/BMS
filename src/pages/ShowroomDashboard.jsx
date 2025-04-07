import React, { useState } from 'react'; import './ShowroomDashboard.css';

const foodItems = [{ id: 1, name: 'Chocolate Cake', price: 12.99, image: 'https://via.placeholder.com/120x100?text=Cake', }, { id: 2, name: 'Strawberry Pastry', price: 9.99, image: 'https://via.placeholder.com/120x100?text=Pastry', },];

const orderHistory = [{ id: '#123', status: 'Pending' }, { id: '#122', status: 'In Progress' }, { id: '#121', status: 'Completed' },];

const ShowroomDashboard = () => {
    const [quantity, setQuantity] = useState(1); const [selectedItem, setSelectedItem] = useState(foodItems[0]);

    const submitOrder = () => {
        alert(`Order submitted:\n${selectedItem.name} x${quantity}`);
      };

    return (<div className="dashboard-container"> <header className="dashboard-header"> <div className="logo">🏪 Showroom Dashboard</div> <div className="profile">👤</div> </header>
        <main className="dashboard-main">
            <section className="order-form">
                <h2>Place New Order</h2>
                <p className="sub-title">Food Item Selection</p>
                <div className="food-list">
                    {foodItems.map((item) => (
                        <div
                            key={item.id}
                            className={`food-card ${selectedItem.id === item.id ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="quantity-control">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>

                <button className="submit-btn" onClick={submitOrder}>
                    Submit Order
                </button>
            </section>

            <aside className="order-tracking">
                <h3>Order Tracking</h3>
                <ul>
                    {orderHistory.map((order) => (
                        <li key={order.id} className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                            <span>{order.id}</span> - {order.status}
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    </div>
    );
};

export default ShowroomDashboard;