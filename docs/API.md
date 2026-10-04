# API Documentation

This document describes the API routes available in the SOLEA application.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Endpoints

### Products

#### Get All Products

```http
GET /api/products
```

**Query Parameters:**
- `category` (optional): Filter by category
- `featured` (optional): Filter featured products (true/false)

**Response:**
```json
[
  {
    "id": "aero-runner",
    "name": "Aero Runner",
    "slug": "aero-runner",
    "category": "PERFORMANCE SERIES",
    "description": "Light Grey / Pure White",
    "price": 129,
    "colors": [...],
    "sizes": [...],
    "images": [...],
    "badge": "NEW DROP",
    "inStock": true,
    "featured": true,
    "rating": 4.8,
    "reviewCount": 24
  }
]
```

**Example:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Get featured products
curl http://localhost:3000/api/products?featured=true

# Get products by category
curl http://localhost:3000/api/products?category=PERFORMANCE%20SERIES
```

---

### Newsletter

#### Subscribe to Newsletter

```http
POST /api/newsletter
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email address"
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid email
- `500`: Server error

**Example:**
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## Future Endpoints (Planned)

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/session
```

### Cart

```http
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/update
DELETE /api/cart/remove
POST   /api/cart/clear
```

### Orders

```http
GET    /api/orders
POST   /api/orders/create
GET    /api/orders/:id
PUT    /api/orders/:id/cancel
```

### Wishlist

```http
GET    /api/wishlist
POST   /api/wishlist/add
DELETE /api/wishlist/remove
```

### Reviews

```http
GET    /api/products/:id/reviews
POST   /api/products/:id/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

---

## Error Handling

All API routes return consistent error responses:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "status": 400
}
```

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:
- 100 requests per 15 minutes per IP for general endpoints
- 10 requests per 15 minutes per IP for sensitive endpoints

## Authentication

Future API routes will require authentication using JWT tokens:

```http
Authorization: Bearer <token>
```

## CORS

CORS is configured to allow requests from:
- Development: `http://localhost:3000`
- Production: Your production domain

## Notes

- All timestamps are in ISO 8601 format
- All prices are in USD cents
- Product IDs are strings
- Image URLs are absolute paths
