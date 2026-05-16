import React,{useState, useEffect} from "react";
import Login from "./Components/Login";
import { foodImages, carouselImages, restaurants, menuItems } from "./Components/Data";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App(){
  const[user, setUser] = useState(null);
  const[cart, setCart] = useState([]);
  const[favorites, setFavorites] = useState([]);
  const[orders, setOrders] = useState([]);
  const[activeTab, setActiveTab] = useState("menu");
  const[trackingOrder, setTrackingOrder] = useState(null);
  const[selectedRestaurant, setSelectedRestaurant] = useState(null);
  const[currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      const savedCart = localStorage.getItem(`cart_${userData.id}`);
      const savedFavs = localStorage.getItem(`favorites_${userData.id}`);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      
      // Fetch orders from backend
      fetchOrders(userData.id);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/orders/${userId}`
    );
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const saveUserData = (userId, newCart, newFavs, newOrders) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavs));
    localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
  };

const handleLogin = async ({type, name, email, password}) => {
  try {
    if (type === "register") {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        name,
        email,
        password
      });

      const newUser = res.data.user || { name, email };
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);
    } 
    else {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        email,
        password
      });

      const foundUser = res.data.user || { email };
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
    }
  } catch (err) {
    alert("Login/Register failed");
    console.log(err);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setCart([]);
    setFavorites([]);
    setOrders([]);
  };

  const addToCart = (item) => {
    const existing = cart.find(i => i.itemId === item.id);
    let newCart;
    if(existing) {
      newCart = cart.map(i => i.itemId === item.id ? {...i, quantity: i.quantity + 1} :i);
    }
    else{
      newCart = [...cart, {itemId: item.id, name:item.name, price:item.price, quantity:1, restId: item.restId}];
    }

    setCart(newCart); 
    saveUserData(user.id, newCart, favorites, orders);
    toast.success("Added to Cart !🤭", {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(i => i.itemId !== itemId);
    setCart(newCart);
    saveUserData(user.id, newCart, favorites, orders);
  };

  const toggleFavorite = (item) => {
    let newFavs;
    if (favorites.find(f => f.id === item.id)) {
      newFavs = favorites.filter(f => f.id !== item.id);
    }
    else{
      newFavs = [...favorites, item];
    }
    setFavorites(newFavs);
    saveUserData(user.id, cart, newFavs, orders);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    try {
      // Send order to backend
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/orders`,
      {
        userId: user.id,
        items: cart,
        totalPrice: total
      });

      const newOrder = {
        id: res.data.order.id,
        date: new Date(res.data.order.date).toLocaleString(),
        items: cart,
        total: total,
        status: "preparing"
      };

      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      saveUserData(user.id, [], favorites, []);
      setTrackingOrder(newOrder);

      toast.success("Order placed! nice choice 😉", {
        position: "bottom-right",
        autoClose: 2000
      });

      setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status:"onway"} : o));
        setTrackingOrder(prev => prev ? {...prev, status:"onway"}: null);
      }, 5000);
      setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status:"delivered"} :o));
        setTrackingOrder(null);
      }, 10000);
      setActiveTab("orders");
    } catch (err) {
      toast.error("Failed to place order", {
        position: "bottom-right",
        autoClose: 2000
      });
      console.log(err);
    }
  };

  const allItems = Object.values(menuItems).flat();
  const recommendedItems = allItems.filter(item => !favorites.find(f => f.id === item.id)).slice(0,4);
  if (!user) return <Login onLogin={handleLogin} />;

  return(
    <div className="app">
      <ToastContainer />
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo"> 🍕 Aaj kia Khaien? </h1>
          <div className="nav-right">
            <span className="user-name" >{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="main-container">
        {activeTab === "menu" && (
          <div className="carousel">
            <div className="carousel-track" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
              {carouselImages.map(img => (
                <div key={img.id} className="carousel-slide">
                  <img src={img.url} alt={img.title} />
                  <div className="carousel-overlay">
                    <h3>{img.title}</h3>
                    <p>{img.subtitle}</p>
                  </div>
                </div>    
              ))}
            </div>
          </div>  
        )}

        <div className="tabs">
          {["menu", "cart", "orders", "profile"].map(tab => (
          <button
          key={tab}
          className={`tab ${activeTab === tab ? "tab-active" : "tab-inactive"}`}
          onClick={() => { setActiveTab(tab); setSelectedRestaurant(null); }}
          >
          {tab === "menu" && "🍽️ Menu"}
          {tab === "cart" && `🛒 Cart (${cart.reduce((s,i)=>s+i.quantity,0)})`}
          {tab === "orders" && "📦 Orders"}
          {tab === "profile" && "❤️ Favorites"}
          </button>
        ))}
        </div>

        {activeTab === 'menu' && !selectedRestaurant && (
          <div className="restaurants-grid">
            {restaurants.map(rest => (
              <div key={rest.id} className="restaurant-card" onClick={() => setSelectedRestaurant(rest)}>
                <div className="restaurant-icon">
                  <span>🏪</span>
                </div>
                <div className="restaurant-info">
                  <h3>{rest.name}</h3>
                  <p>{rest.cuisine} {rest.rating}</p>
                  <small>{rest.deliveryTime} • {rest.deliveryFee}</small>
                </div>
              </div>
            ))}
          </div>
        )}

         {activeTab === 'menu' && selectedRestaurant && (
          <>
            <button className="back-btn" onClick={() => setSelectedRestaurant(null)}>← Back to Restaurants</button>
            <div className="food-grid">
              {menuItems[selectedRestaurant.id].map(item => (
                <div key={item.id} className="food-card">
                  <img src={foodImages[item.id]} alt={item.name} />
                  <div className="food-info">
                    <h4>{item.name}</h4>
                    <p className="price">Rs {item.price}</p>
                    <div className="food-actions">
                      <button 
                        className={`fav-btn ${favorites.find(f => f.id === item.id) ? 'fav-active' : ''}`}
                        onClick={() => toggleFavorite(item)}
                      >
                        ❤️
                      </button>
                      <button 
                        className={`cart-btn ${cart.find(c => c.itemId === item.id) ? 'cart-added' : ''}`}
                        onClick={() => addToCart(item)}
                      >
                        {cart.find(c => c.itemId === item.id) ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'cart' && (
          <div className="cart-container">
            {cart.length === 0 ? (
              <p className="empty-message">Your cart is empty 🛒</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.itemId} className="cart-item">
                    <div>
                      <strong>{item.name}</strong> x{item.quantity}
                    </div>
                    <div>
                      Rs {item.price * item.quantity}
                      <button className="remove-btn" onClick={() => removeFromCart(item.itemId)}>Remove</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: Rs {cart.reduce((s,i)=>s+(i.price*i.quantity),0)}</strong>
                  <button className="place-order-btn" onClick={placeOrder}>Place Order →</button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-container">
            {orders.length === 0 ? (
              <p className="empty-message">No orders yet</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <strong>Order #{order.id}</strong>
                    <span className={`order-status ${order.status}`}>
                      {order.status === 'preparing' ? 'Preparing' : order.status === 'onway' ? 'On Way' : 'Delivered'}
                    </span>
                  </div>
                  <small>{order.date}</small>
                  <div className="order-items">{order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</div>
                  <div className="order-total">Rs {order.total}</div>
                </div>
              ))
            )}
            {trackingOrder && (
              <div className="tracking-card">
                <strong>📍 Live: {trackingOrder.status === 'preparing' ? 'Preparing your order...' : 'Out for delivery!'}</strong>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: trackingOrder.status === 'preparing' ? '50%' : '90%'}}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-container">
            <div className="favorites-section">
              <h4>❤️ Favorites ({favorites.length})</h4>
              {favorites.length === 0 ? (
                <p className="text-muted">No favorites yet</p>
              ) : (
                <div className="favorites-grid">
                  {favorites.map(item => (
                    <div key={item.id} className="favorite-item">
                      <img src={foodImages[item.id]} alt={item.name} />
                      <small>{item.name}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="recommendations-section">
              <h4>Recommended For You</h4>
              <div className="recommendations-grid">
                {recommendedItems.map(item => (
                  <div key={item.id} className="recommend-item">
                    <img src={foodImages[item.id]} alt={item.name} />
                    <p>{item.name}</p>
                    <p className="price">Rs {item.price}</p>
                    <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
  );
}

export default App;