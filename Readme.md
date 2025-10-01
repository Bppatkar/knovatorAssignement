# 🛍️ E-Commerce MERN Stack Application

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a beautiful UI, dark mode, and seamless shopping experience.

## ✨ Features

### 🎯 Core Features
- **Product Catalog** - Browse 30+ products across multiple categories
- **Shopping Cart** - Add/remove items with quantity management
- **Order Management** - Place orders with customer information
- **Responsive Design** - Mobile-first responsive design
- **Dark Mode** - Toggle between light and dark themes

### 🛍️ Product Features
- Product listing with images, prices, and ratings
- Product categories (Electronics, Fashion, Sports, Gaming, etc.)
- Brand filtering and price range filtering
- Star rating system
- Delivery options (Standard, Pick Up)

### 🎨 UI/UX Features
- Modern gradient designs and smooth animations
- Toast notifications for user actions
- Loading states and error handling
- Professional product cards with hover effects
- Sticky headers and intuitive navigation

## 🚀 Live Demo

- **Frontend:** https://knovatorassignement-1-front.onrender.com
- **Backend API:** https://knovatorassignement.onrender.com
- **API Health Check:** https://knovatorassignement.onrender.com/api/health

## 📸 Screenshots

### Product Listing Page
<img width="1711" height="932" alt="image" src="https://github.com/user-attachments/assets/000663ef-5ba1-4776-9286-0a0e36205bb1" />


### Shopping Cart
<img width="1653" height="905" alt="image" src="https://github.com/user-attachments/assets/2ca00701-2697-4bd3-a2d4-5d689e9337e1" />


### Order Placed
<img width="1748" height="848" alt="image" src="https://github.com/user-attachments/assets/122e05cb-1219-4a9b-a5c5-95c181161df3" />


## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Notification system
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Deployment
- **Render.com** - Cloud platform for deployment
- **MongoDB Atlas** - Cloud database service

## 📁 Project Structure

```
ecommerce-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API services
│   │   └── App.js         # Main App component
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Node.js application
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── data/            # Sample product data
│   ├── server.js        # Main server file
│   └── package.json
└── README.md
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ecommerce-mern-app.git
cd ecommerce-mern-app
```

2. **Backend Setup**

```bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/ecommerce" > .env
echo "PORT=7000" >> .env

# Start backend server
npm run dev
```

3. **Frontend Setup**

```bash
cd client
npm install

# Start frontend development server
npm run dev
```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:7000

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=7000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:7000/api
```

## 📚 API Documentation

### Products
- `GET /api/products` - Get all products
- `GET /api/products/filters` - Get available filters

### Orders
- `POST /api/orders` - Create a new order

### Health Check
- `GET /api/health` - Server health status

### Example API Usage

```javascript
// Get all products
const response = await fetch('https://knovatorassignement.onrender.com/api/products');
const products = await response.json();

// Place an order
const orderData = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  items: [{ product: 'product_id', quantity: 2 }],
  totalAmount: 199.98
};

const response = await fetch('https://knovatorassignement.onrender.com/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});
```

## 🎯 Key Features Implementation

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart state using React Context
- Real-time total calculation

### Product Management
- 30+ sample products with realistic data
- High-quality product images from Unsplash
- Categories: Electronics, Fashion, Sports, Gaming, Home, Health
- Brands: Apple, Samsung, Nike, Adidas, Sony, Canon, etc.

### Order System
- Customer information validation
- Order confirmation with success messages
- Order logging in database

### UI/UX
- Responsive grid layout
- Smooth hover animations
- Professional color scheme
- Dark/light mode toggle
- Loading states and error handling

## 🚀 Deployment

### Backend Deployment (Render.com)
1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on git push

### Frontend Deployment (Render.com)
1. Connect GitHub repository
2. Set build command: `npm install && npm run build`
3. Set publish directory: `dist`
4. Set environment variables

### Database (MongoDB Atlas)
1. Create free cluster on MongoDB Atlas
2. Whitelist IP addresses (0.0.0.0/0 for all)
3. Get connection string
4. Update MONGODB_URI environment variable


### API Testing
```bash
# Test health endpoint
curl https://knovatorassignement.onrender.com/api/health

# Test products endpoint
curl https://knovatorassignement.onrender.com/api/products
```

Owner - Bhanu Pratap Patkar

Project Link: [https://github.com/yourusername/ecommerce-mern-app](https://github.com/yourusername/ecommerce-mern-app)

---

<div align="center">

**Built with ❤️ using the MERN Stack**

Happy Coding! 🚀

</div>
