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

## 🏗️ Tech Stack

- **Backend:** Go (Golang), Gorilla Mux / Gin / Fiber (depending on framework)
- **Database:** PostgreSQL / MySQL
- **Frontend (Admin):** HTML/CSS + JS or optionally React/Vue
- **Templating:** Go `html/template` or React (for frontend separation)
- **ORM:** GORM / sqlx
- **Authentication:** JWT-based sessions

## 🛠️ Build
```
docker compose up -d --build
```
