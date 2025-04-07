import React from "react";
import "./BakeryDashboard.css";

const orders = [
  {
    id: "ORD-2025001",
    item: "2x Birthday Cake",
    due: "Jan 15, 2025",
    status: "New",
  },
  {
    id: "ORD-2025002",
    item: "12x Cupcakes",
    due: "Jan 15, 2025",
    status: "New",
  },
  {
    id: "ORD-2025003",
    item: "1x Wedding Cake",
    due: "Jan 16, 2025",
    status: "In Progress",
  },
  {
    id: "ORD-2025004",
    item: "24x Bread Rolls",
    deliveryTime: "2:00 PM",
    status: "Ready",
  },
];

const BakeryDashboard = () => {
  const categorizedOrders = { New: [], "In Progress": [], Ready: [] };

  orders.forEach((order) => {
    categorizedOrders[order.status].push(order);
  });

  return (
    <div className="bakery-dashboard">
      {" "}
      <header className="dashboard-header">
        {" "}
        <div className="logo">🍰 Bakery Dashboard</div>{" "}
        <div className="profile">👤 John D.</div>{" "}
      </header>
      <main className="dashboard-content">
        {Object.entries(categorizedOrders).map(([status, orderList]) => (
          <section key={status} className="order-section">
            <h3>
              {status === "New"
                ? "Incoming Orders"
                : status === "In Progress"
                ? "In Progress"
                : "Ready for Delivery"}
            </h3>
            {orderList.length === 0 ? (
              <p className="empty-text">No orders</p>
            ) : (
              orderList.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-info">
                    <h4>#{order.id}</h4>
                    <p>{order.item}</p>
                    {order.due && (
                      <span className="meta">Due: {order.due}</span>
                    )}
                    {order.deliveryTime && (
                      <span className="meta">
                        Delivery: {order.deliveryTime}
                      </span>
                    )}
                  </div>
                  <div
                    className={`status-label ${status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {status}
                  </div>
                </div>
              ))
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default BakeryDashboard;
