export const foodImages = {
  101: "https://i.ytimg.com/vi/GIYgCNsgzUw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCjwWjbJ23XExe2KWcHottP40j5hw",

  102: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=200&fit=crop",
  
  103: "https://nodashofgluten.com/wp-content/uploads/2025/02/Hyderabadi-Chicken-Biryani-Recipe-1-683x1024.png",
  
  201: "https://www.mccormick.com/cdn/shop/articles/loaded_beef_nachos.webp?v=1746729661",
  
  202: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAy_PfocTDhw-yPqeYa4pm7lF5mBNUpUMGPA&s",
  
  203: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2W_j4-94cTPdGYtN7L4Qy3c4U7mJatEyww&s",

  301: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop",
  
  302: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=200&fit=crop",
  
  303: "https://www.spicebangla.com/wp-content/uploads/2020/12/Garlic-Bread.webp"
};

export const carouselImages= [
    {
        id:1,
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop",
        title: "Biryani Special",
        subtitle: "Get 30% off on first order"
    },
    {
        id:2,
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=400&fit=crop",
        title: "Pizza",
        subtitle: "Buy 1 Get 1 Free"
    },
    {
        id:3,
        url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&h=400&fit=crop",
        title: "Burger Feast",
        subtitle: "Free Delivery on 900/- +"
    }
];

export const restaurants=[
    {id:1, name: "Spice Fusion", cuisine: "Pakistani", rating: 4.5, deliveryTime: "25-30 min", deliveryFee: "Free"},
    {id:2, name:"Burrito Baithak", cuisine:"Mexican", rating:4.3, deliveryTime:"20-25 min", deliveryFee:"Rs 50"},
    {id:3, name: "Pizza Heart", cuisine: "Italian", rating:4.6, deliveryTime:"30-40 min", deliveryFee:"Free"},
];

export const menuItems={
    1: [
        {id:101, name:"Chicken Karahi", price: 950, restId: 1, isPopular: true},
        {id:102, name:"Butter Naan", price: 150, restId: 1, isPopular: false},
        {id:103, name:"Chicken Biryani", price: 550, restId: 1, isPopular: true}
    ],
    2: [
        {id:201, name: "Loaded Nachos", price: 450, restId: 2, isPopular: true},
        {id:202, name: "Chicken Quesadilla", price:590, restId: 2, isPopular: true},
        {id:203, name:"Spicy Tacos", price:"320", restId: 2, isPopular: false}
    ],
    3: [
        {id:301, name: "Cheesy Pizza", price:780, restId: 3, isPopular: true},
        {id:302, name: "Pepperoni Feast", price:990, restId: 3, isPopular: true},
        {id:303, name: "Garlic Bread", price: 190, restId: 3, isPopular: false}
    ]
};