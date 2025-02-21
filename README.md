# E-Commerce Backend API

## Overview
This project is a backend API for an e-commerce platform built using **Node.js, Express, and MongoDB**. It supports user authentication, product management, and order processing with role-based access control.

## Features
- **User Authentication & Authorization** (JWT-based)
- **CRUD operations for Products and Orders**
- **Role-based access control (Admin & Customer)**
- **Data Import from External API**
- **MongoDB Relationship Management with Mongoose**

---

## Tech Stack
- **Node.js** (Runtime Environment)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **Axios** (Data Fetching from External API)
- **Cors** (Cross-Origin Resource Sharing)

---

## Installation & Setup

### Prerequisites
- **Node.js** (>=14.x)
- **MongoDB** (Ensure MongoDB is running locally or use a cloud database)

### Clone Repository
```bash
git clone <repository-url>
cd e-commerce-backend
```

### Install Dependencies
```bash
npm install
```

### Start the Server
```bash
npm start
```
Server will run at: `http://localhost:5000`

---

## API Endpoints

### 1. **User Authentication**
| Method | Endpoint | Description | Protected |
|--------|-------------|-------------|------------|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login and receive a JWT token | No |

---

### 2. **Product Management**
| Method | Endpoint | Description | Protected |
|--------|-------------|-------------|------------|
| POST | `/api/products/` | Create a new product | Yes (Admin) |
| GET | `/api/products/` | Get all products | No |
| GET | `/api/products/:id` | Get product by ID | No |
| PUT | `/api/products/:id` | Update product | Yes (Admin) |
| DELETE | `/api/products/:id` | Delete product | Yes (Admin) |

---

### 3. **Order Management**
| Method | Endpoint | Description | Protected |
|--------|-------------|-------------|------------|
| POST | `/api/orders/` | Create a new order | Yes (User) |
| GET | `/api/orders/` | Get all orders | Yes (Admin) |
| GET | `/api/orders/:id` | Get order by ID | Yes (User) |
| PUT | `/api/orders/:id` | Update order status | Yes (Admin) |

---

## Database Structure

### User Schema (`users` Collection)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "customer",
  "orders": ["order_id_1", "order_id_2"]
}
```

### Product Schema (`products` Collection)
```json
{
  "name": "Smartphone",
  "price": 599.99,
  "description": "Latest model smartphone",
  "category": "Electronics",
  "stock": 50,
  "reviews": [
    {
      "user": "user_id",
      "rating": 5,
      "comment": "Excellent product!"
    }
  ]
}
```

### Order Schema (`orders` Collection)
```json
{
  "user": "user_id",
  "products": [
    { "product": "product_id", "quantity": 2 }
  ],
  "totalPrice": 1199.98,
  "status": "pending"
}
```

---

## Data Import from External API
To populate the database with sample products from `https://fakestoreapi.com/products`, run:
```bash
node scripts/importProducts.js
```

---

## Security Measures
- **JWT Authentication**: Secures user sessions.
- **Role-Based Access Control**: Limits actions based on user role.
- **Password Hashing**: Uses `bcrypt.js` for secure password storage.
- **Protected Routes**: Middleware ensures restricted access.

---

## Future Enhancements
- Implement **payment processing**.
- Add **order history and tracking**.
- Improve **search and filtering** for products.

---

## Author
Developed by **[Muanmmar Tajwar ARiq]**