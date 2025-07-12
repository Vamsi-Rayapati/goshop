# 🛒 GoShop – Go-Based Shopping Application

**GoShop** is a full-featured shopping application built with Golang. It includes features for customers to browse and purchase products, as well as an admin dashboard for managing inventory, orders, and users.

---

## 🚀 Features

### 🧑‍💻 User-Facing
- User registration and login
- Product listing with categories and search
- Product details view
- Add to cart and checkout
- Order history and order tracking

### 👨‍💼 Admin Dashboard
- Admin authentication
- Product CRUD (Create, Read, Update, Delete)
- Order management (view, update status)
- User management (view, block/unblock)
- Reports and analytics (basic dashboard)

---

## 📁 Project Structure

```
project/
├── goshop/                     # Main project directory with Docker Compose
├── goshop-account-service/     # User account management microservice
├── goshop-admin-frontend/      # React-based admin dashboard
├── goshop-ecommerce-frontend/  # NextJS-based user shopping interface
├── goshop-auth-service/        # Authentication microservice
├── goshop-catalog-service/     # Product catalog microservice
├── goshop-fusionauth-service/  # FusionAuth identity provider
├── goshop-storage-service/     # AWS file upload common service
└── goshop-mysql-service/       # MySQL database service
```

---

## 🏗️ Tech Stack

- **Backend:** Go (Golang), Gin 
- **Database:** MySQL
- **Frontend (Admin):** HTML/CSS + JTSS or optionally React
- **ORM:** GORM 
- **Authentication:** JWT-based sessions

## 🛠️ Build
```
docker compose up -d --build
```
