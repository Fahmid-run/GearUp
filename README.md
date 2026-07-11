

# 🏋️ GearUp

<div align="center">

### 🚴 Rent Sports & Outdoor Gear Instantly

*A secure, scalable RESTful backend API for a sports and outdoor equipment rental platform built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe Checkout**.*

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)

</div>

---

# 📖 Project Overview

GearUp is a **RESTful Backend API** that powers an online **Sports & Outdoor Equipment Rental Platform**.

The platform connects **Customers** looking to rent sports equipment with **Providers** who manage rental inventories. Customers can browse available gear, place rental orders, make secure online payments through **Stripe Checkout**, track their rental status, and leave reviews after returning equipment.

Providers can efficiently manage their inventory, monitor rental requests, confirm bookings, update rental statuses, and maintain stock availability.

Administrators oversee the entire platform by managing users, monitoring rentals, moderating listings, and ensuring smooth platform operations.

The project follows modern backend development practices including:

- RESTful API Architecture
- JWT Authentication
- Role Based Access Control (RBAC)
- Prisma ORM
- PostgreSQL Database
- Stripe Payment Gateway
- Secure Password Hashing
- Layered Architecture
- Modular Folder Structure
- Centralized Error Handling
- Input Validation
- Transaction Support

---

# 🚀 Features

## 🌐 Public Features

- Browse all available sports equipment
- Search gear by keyword
- Filter by category
- Filter by brand
- Filter by availability
- View gear details
- View gear reviews

---

## 👤 Customer Features

- Register account
- Secure login
- JWT Authentication
- Update profile
- Browse available gear
- Rent multiple gear items in one order
- Select rental dates
- Automatic rental cost calculation
- Stripe Checkout payment
- View payment history
- Track rental status
- Leave reviews after returning equipment

---

## 🏪 Provider Features

- Register as Provider
- Manage profile
- Add new gear
- Update gear information
- Delete gear
- Manage stock
- View incoming rental requests
- Confirm rental orders
- Mark gear as picked up
- Mark gear as returned

---

## 👑 Admin Features

- Manage all users
- Suspend or activate users
- View all gear listings
- View all rental orders
- Monitor payments
- Manage platform activities

> **Note:** Admin accounts are **not publicly registerable** and should only be created manually (e.g., via a seed script or directly in the database).

---


# 👥 User Roles

| Role | Description |
|-------|-------------|
| Customer | Rent sports equipment |
| Provider | Manage rental inventory |
| Admin | Manage entire platform |

---


# 🛠 Installation

Clone the repository

```bash
git clone https://github.com/Fahmid-run/GearUp.git
```

Move into the project

```bash
cd GearUp
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migration

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

---

# 🌱 Environment Variables

Create a **.env** file.

```env
PORT=5000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=7d

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=30d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

CLIENT_URL=http://localhost:3000
```

---

# 📡 API Base URL

### Local

```
http://localhost:5000/api
```

### Production

```
https://gearup-rouge.vercel.app/api
```

---

# 🌍 Live Links

| Resource | URL |
|----------|-----|
| Backend API | https://gearup-rouge.vercel.app/ |
---




# 🔑 Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /auth/register | Public | Register Customer or Provider |
| POST | /auth/login | Public | Login user |
| GET | /auth/me | Authenticated | Get current logged in user |

---

# 🏋 Gear APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /gear | Public | Get all gear |
| GET | /gear/:id | Public | Get gear details |
| POST | /provider/gear | Provider | Create gear |
| PUT | /provider/gear/:id | Provider | Update own gear |
| DELETE | /provider/gear/:id | Provider | Delete own gear |

---

# 📦 Rental APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /rentals | Customer | Create rental order |
| GET | /rentals | Customer | Get own rentals |
| GET | /rentals/:id | Customer | Rental details |

---

# 🏪 Provider APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /provider/orders | Provider | View incoming rentals |
| PATCH | /provider/orders/:id | Provider | Update rental status |

---

# 💳 Payment APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /payments/create-checkout-session/:rentalOrderId | Customer | Create Stripe Checkout Session |
| POST | /payments/webhook | Stripe | Stripe Webhook |
| GET | /payments | Customer | Payment history |
| GET | /payments/:id | Customer | Payment details |

---

# ⭐ Review APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /reviews | Customer | Leave review |
| GET | /reviews | Public | Get all reviews |
| GET | /reviews/:id | Public | Review details |

---

# 👑 Admin APIs

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /admin/users | Admin | Get all users |
| PATCH | /admin/users/:id | Admin | Suspend or activate user |
| GET | /admin/rentals | Admin | View all rentals |
| GET | /admin/gear | Admin | View all gear |

---

# 🔄 Rental Order Lifecycle

```text
PLACED
   │
   ▼
CONFIRMED
   │
   ▼
PAID
   │
   ▼
PICKED_UP
   │
   ▼
RETURNED
```

---


# 📦 Demo Request Payloads

---

## Register Customer

**POST** `/auth/register`

```json
{
  "name": "Nabil",
  "email": "customer@gmail.com",
  "password": "12345678",
  "phone": "01812345678",
  "address": "Dhaka",
  "role": "Customer"
}
```

---

## Register Provider

```json
{
  "name": "Sports Hub",
  "email": "provider@gmail.com",
  "password": "12345678",
  "phone": "01712345678",
  "address": "Dhaka",
  "role": "Provider"
}
```

---

## Login

**POST** `/auth/login`

```json
{
  "email": "customer@gmail.com",
  "password": "12345678"
}
```

---

## Create Gear

**POST** `/provider/gear`

```json
{
  "name": "Mountain Bike",
  "description": "Premium mountain bike suitable for rough terrain.",
  "image": "https://example.com/bike.jpg",
  "stock": 5,
  "condition": "Excellent",
  "rentalPricePerDay": 35,
  "brand": "Trek",
  "category": "CYCLING",
  "availability": "AVAILABLE"
}
```

---

## Create Rental Order

**POST** `/rentals`

```json
{
  "startDate": "2026-07-15T09:00:00.000Z",
  "endDate": "2026-07-18T09:00:00.000Z",
  "items": [
    {
      "gearItemId": "gear_item_uuid",
      "quantity": 2
    },
    {
      "gearItemId": "gear_item_uuid",
      "quantity": 1
    }
  ]
}
```

---

## Update Rental Status

**PATCH**

```
/provider/orders/:id
```

Confirm

```json
{
  "rentalStatus": "CONFIRMED"
}
```

---

Picked Up

```json
{
  "rentalStatus": "PICKED_UP"
}
```

---

Returned

```json
{
  "rentalStatus": "RETURNED"
}
```

---

## Create Stripe Checkout Session

**POST**

```
/payments/create-checkout-session/:rentalOrderId
```

No request body required.

Response

```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

---

## Leave Review

```json
{
  "gearItemId": "gear_uuid",
  "rating": 5,
  "review": "Amazing quality gear. Highly recommended."
}
```

---

# 📥 Success Response Format

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Operation Successful",
    "data": {}
}
```

---

# ❌ Error Response Format

```json
{
    "success": false,
    "statusCode": 400,
    "message": "Validation Error",
    "errorDetails": []
}
```

---





# 🔄 Complete Application Flow

```
Customer
    │
    ▼
Register / Login
    │
    ▼
Browse Available Gear
    │
    ▼
Select Rental Dates
    │
    ▼
Create Rental Order
    │
    ▼
Rental Status = PLACED
    │
    ▼
Provider Confirms Rental
    │
    ▼
Rental Status = CONFIRMED
    │
    ▼
Create Stripe Checkout Session
    │
    ▼
Stripe Hosted Checkout
    │
    ▼
Payment Successful
    │
    ▼
Stripe Webhook
    │
    ▼
Payment Status = SUCCESS
Rental Status = PAID
    │
    ▼
Provider Marks PICKED_UP
    │
    ▼
Provider Marks RETURNED
    │
    ▼
Customer Leaves Review
```

---


# 💳 Stripe Payment Flow

```
Customer
      │
      ▼
Create Checkout Session
      │
      ▼
Stripe Checkout URL
      │
      ▼
Redirect Customer
      │
      ▼
Payment Success
      │
      ▼
Stripe Webhook
      │
      ▼
Update Payment Table
      │
      ▼
Update Rental Status
```

---

# 🛡 Validation Rules

### Authentication

- Email must be unique.
- Password must be hashed.
- Phone number must be unique.

---

### Rental Order

- Start date must be before end date.
- Rental must contain at least one gear item.
- Stock must be available.
- All gear items must belong to the same provider.
- Rental cannot be paid twice.

---

### Review

- Customer can review only after rental is returned.
- Rating must be between **1–5**.
- Customer can review only rented gear.

---

### Provider

- Provider can only manage their own gear.
- Provider cannot modify another provider's inventory.

---

### Admin

- Admin accounts cannot be created through the registration API.
- Only seeded or manually created admins can access admin routes.

---


