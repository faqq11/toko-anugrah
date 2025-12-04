# API Specification

## Base URL

`localhost:3000/api`

---

## Authentication

| Type         | Details                                        |
| ------------ | ---------------------------------------------- |
| Bearer Token | Send token via `Authorization: Bearer <token>` |

---

## Endpoints

### Users

### 1. GET all Users (Admin only)

**GET** `/users`

Description: Requires token. Get list of registered users.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "User list retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@mail.com",
      "role": "guest",
      "phone": "123456789",
      "address": "Ujung Semi"
    },
    {
      "id": 2,
      "name": "John Doe2",
      "email": "johndoe2@mail.com",
      "role": "guest",
      "phone": "123456789",
      "address": "Jagapura"
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. Get one user

**GET** `/users/:id`

Description: Requires token .Retrieve a user by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@mail.com",
    "role": "guest",
    "phone": "123456789",
    "address": "Ujung Semi"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Register / Create a new user

**POST** `/auth/register`

Description: Create a new user account.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Content-Type | application/json |

Body:

```json
{
  "first_name": "John",
  "last_name": "doe",
  "email": "johndoe@mail.com",
  "password": "securepassword123",
  "phone": "123456789",
  "address": "Ujung Semi"
}
```

#### Response - 201 Created

```json
{
  "success": true,
  "status_code": 201,
  "message": "Account created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@mail.com",
    "role": "guest",
    "phone": "123456789",
    "address": "Ujung Semi"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "email": "Email already exists",
    "password": "Password must be at least 8 characters"
  }
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 4. Login

**POST** `/auth/login`

Description: Authenticate user and receive access token.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Content-Type | application/json |

Body:

```json
{
  "email": "johndoe@mail.com",
  "password": "securepassword123"
}
```

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "email": "Email is required",
    "password": "Password is required"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Invalid email or password"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 5. Update a user

**PUT** `/users/:id`

Description: Requires token. Update an existing user by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "first_name": "John",
  "last_name": "Doe Updated",
  "email": "johndoe.updated@mail.com",
  "phone": "987654321",
  "address": "Jagapura"
}
```

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "johndoe.updated@mail.com",
    "role": "admin",
    "phone": "987654321",
    "address": "Jagapura"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "email": "Email already exists",
    "name": "Name is required"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 6. Delete a user

**DELETE** `/users/:id`

Description: Requires token. Delete an existing user by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@mail.com",
    "role": "guest",
    "phone": "123456789",
    "address": "Ujung Semi"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### Products

### 1. GET all Products

**GET** `/products`

Description: Requires token. Get list of all available products in the wholesale store.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Product list retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Indomie Goreng",
      "brand": "Indofood",
      "description": "Mie goreng instant rasa original",
      "categories": ["Food", "Instant Noodles", "Snacks"],
      "price": 2500,
      "stock": 500
    },
    {
      "id": 2,
      "name": "Aqua Mineral Water 600ml",
      "brand": "Aqua",
      "description": "Air mineral dalam kemasan botol 600ml",
      "categories": ["Beverages", "Water"],
      "price": 3000,
      "stock": 1000
    },
    {
      "id": 3,
      "name": "Beras Premium 5kg",
      "brand": "Sania",
      "description": "Beras premium kualitas terbaik kemasan 5kg",
      "categories": ["Food", "Staples", "Rice"],
      "price": 65000,
      "stock": 200
    },
    {
      "id": 4,
      "name": "Minyak Goreng 2L",
      "brand": "Bimoli",
      "description": "Minyak goreng kemasan 2 liter",
      "categories": ["Food", "Cooking Oil", "Staples"],
      "price": 32000,
      "stock": 150
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. Get one product

**GET** `/products/:id`

Description: Requires token. Retrieve a product by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Indomie Goreng",
    "brand": "Indofood",
    "description": "Mie goreng instant rasa original",
    "categories": ["Food", "Instant Noodles", "Snacks"],
    "price": 2500,
    "stock": 500
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Create a new product (Admin only)

**POST** `/products`

Description: Requires token. Create a new product.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "name": "Indomie Goreng",
  "brand": "Indofood",
  "description": "Mie goreng instant rasa original",
  "categories": ["Food", "Instant Noodles", "Snacks"],
  "price": 2500,
  "stock": 500
}
```

#### Response - 201 Created

```json
{
  "success": true,
  "status_code": 201,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Indomie Goreng",
    "brand": "Indofood",
    "description": "Mie goreng instant rasa original",
    "categories": ["Food", "Instant Noodles", "Snacks"],
    "price": 2500,
    "stock": 500
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "name": "Product name is required",
    "price": "Price must be a positive number",
    "stock": "Stock must be a non-negative number"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response -

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 4. Update a product (Admin only)

**PUT** `/products/:id`

Description: Requires token. Update an existing product by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "name": "Indomie Goreng Special",
  "brand": "Indofood",
  "description": "Mie goreng instant rasa original edisi spesial",
  "categories": ["Food", "Instant Noodles", "Snacks", "Bestseller"],
  "price": 3000,
  "stock": 750
}
```

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Indomie Goreng Special",
    "brand": "Indofood",
    "description": "Mie goreng instant rasa original edisi spesial",
    "categories": ["Food", "Instant Noodles", "Snacks", "Bestseller"],
    "price": 3000,
    "stock": 750
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "name": "Product name is required",
    "price": "Price must be a positive number",
    "stock": "Stock must be a non-negative number"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 5. Delete a product (Admin only)

**DELETE** `/products/:id`

Description: Requires token. Delete an existing product by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Product deleted successfully",
  "data": {
    "id": 1,
    "name": "Indomie Goreng",
    "brand": "Indofood",
    "description": "Mie goreng instant rasa original",
    "categories": ["Food", "Instant Noodles", "Snacks"],
    "price": 2500,
    "stock": 500
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### Brand

### 1. GET all Brands

**GET** `/brands`

Description: Requires token. Get list of all available brands.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Brand list retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Indofood"
    },
    {
      "id": 2,
      "name": "Aqua"
    },
    {
      "id": 3,
      "name": "Sania"
    },
    {
      "id": 4,
      "name": "Bimoli"
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. Create a new brand (Admin only)

**POST** `/brands`

Description: Requires token. Create a new brand.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "name": "Indofood"
}
```

#### Response - 201 Created

```json
{
  "success": true,
  "status_code": 201,
  "message": "Brand created successfully",
  "data": {
    "id": 1,
    "name": "Indofood"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "name": "Brand name is required"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Delete a brand (Admin only)

**DELETE** `/brands/:id`

Description: Requires token. Delete an existing brand by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Brand deleted successfully",
  "data": {
    "id": 1,
    "name": "Indofood"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### Category

### 1. GET all Categories

**GET** `/categories`

Description: Get list of all available categories.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Category list retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Food"
    },
    {
      "id": 2,
      "name": "Beverages"
    },
    {
      "id": 3,
      "name": "Instant Noodles"
    },
    {
      "id": 4,
      "name": "Snacks"
    },
    {
      "id": 5,
      "name": "Staples"
    },
    {
      "id": 6,
      "name": "Cooking Oil"
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. Create a new category (Admin only)

**POST** `/categories`

Description: Requires token. Create a new category.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "name": "Food"
}
```

#### Response - 201 Created

```json
{
  "success": true,
  "status_code": 201,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Food"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "name": "Category name is required"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Delete a category (Admin only)

**DELETE** `/categories/:id`

Description: Requires token. Delete an existing category by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Category deleted successfully",
  "data": {
    "id": 1,
    "name": "Food"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### Order

### 1. GET all Orders(admin)

**GET** `/orders`

Description: Requires token. Get list of all orders.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order list retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "total_amount": 50000,
      "status": "pending",
      "shipping_address": "Jl. Merdeka No. 123, Jakarta",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    },
    {
      "id": 2,
      "user_id": 2,
      "total_amount": 125000,
      "status": "processing",
      "shipping_address": "Jl. Sudirman No. 45, Bandung",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    },
    {
      "id": 3,
      "user_id": 1,
      "total_amount": 75000,
      "status": "shipped",
      "shipping_address": "Jl. Gatot Subroto No. 67, Surabaya",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    },
    {
      "id": 4,
      "user_id": 3,
      "total_amount": 200000,
      "status": "delivered",
      "shipping_address": "Jl. Asia Afrika No. 89, Semarang",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. GET all Orders(ownership)

**GET** `/orders`

Description: Requires token. Get list of all orders.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order list retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "total_amount": 50000,
      "status": "pending",
      "shipping_address": "Jl. Merdeka No. 123, Jakarta",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    },
    {
      "id": 3,
      "user_id": 1,
      "total_amount": 75000,
      "status": "shipped",
      "shipping_address": "Jl. Gatot Subroto No. 67, Surabaya",
      "order_item": [
        {
          "id": 1,
          "order_id": 1,
          "product_name": "Antangin",
          "quantity": 5,
          "price": 15000
        }
      ]
    }
  ]
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Get one order

**GET** `/orders/:id`

Description: Requires token. Retrieve an order by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order retrieved successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "total_amount": 50000,
    "status": "pending",
    "shipping_address": "Jl. Merdeka No. 123, Jakarta",
    "order_item": [
      {
        "id": 1,
        "order_id": 1,
        "product_name": "Antangin",
        "quantity": 5,
        "price": 10000
      }
    ]
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 4. Create a new order

**POST** `/orders`

Description: Requires token. Create a new order.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "user_id": 1,
  "total_amount": 50000,
  "status": "pending",
  "shipping_address": "Jl. Merdeka No. 123, Jakarta"
}
```

#### Response - 201 OK

```json
{
  "success": true,
  "status_code": 201,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "total_amount": 50000,
    "status": "pending",
    "shipping_address": "Jl. Merdeka No. 123, Jakarta"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "user_id": "User ID is required",
    "total_amount": "Total amount must be a positive number",
    "shipping_address": "Shipping address is required"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 5. Update an order

**PUT** `/orders/:id`

Description: Requires token. Update an existing order by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "user_id": 1,
  "total_amount": 75000,
  "status": "processing",
  "shipping_address": "Jl. Gatot Subroto No. 67, Surabaya"
}
```

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order updated successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "total_amount": 75000,
    "status": "processing",
    "shipping_address": "Jl. Gatot Subroto No. 67, Surabaya"
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "total_amount": "Total amount must be a positive number",
    "status": "Status must be one of: pending, processing, shipped, delivered, cancelled"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 6. Delete an order

**DELETE** `/orders/:id`

Description: Requires token. Delete an existing order by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order deleted successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "total_amount": 50000,
    "status": "pending",
    "shipping_address": "Jl. Merdeka No. 123, Jakarta"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### Order-items

### 1. GET all Order Items

**GET** `/order-items`

Description: Requires token. Get list of all order items.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order item list retrieved successfully",
  "data": [
    {
      "id": 1,
      "order_id": 1,
      "product": "Indomie Goreng",
      "quantity": 10,
      "price": 2500
    },
    {
      "id": 2,
      "order_id": 1,
      "product": "Aqua Mineral Water 600ml",
      "quantity": 5,
      "price": 3000
    },
    {
      "id": 3,
      "order_id": 2,
      "product": "Beras Premium 5kg",
      "quantity": 2,
      "price": 65000
    },
    {
      "id": 4,
      "order_id": 2,
      "product": "Minyak Goreng 2L",
      "quantity": 3,
      "price": 32000
    }
  ]
}
```

#### Response - Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 2. Get one order item

**GET** `/order-items/:id`

Description: Requires token. Retrieve an order item by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

##### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order item retrieved successfully",
  "data": {
    "id": 1,
    "order_id": 1,
    "product": "Indomie Goreng",
    "quantity": 10,
    "price": 2500
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 3. Create a new order item

**POST** `/order-items`

Description: Requires token. Create a new order item.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "order_id": 1,
  "product_id": 1,
  "quantity": 10,
  "price": 2500
}
```

#### Response - 201 Created

```json
{
  "success": true,
  "status_code": 201,
  "message": "Order item created successfully",
  "data": {
    "id": 1,
    "order_id": 1,
    "product": "Indomie Goreng",
    "quantity": 10,
    "price": 2500
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "order_id": "Order ID is required",
    "product_id": "Product ID is required",
    "quantity": "Quantity must be a positive number",
    "price": "Price must be a positive number"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden - Insufficient permissions"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 4. Update an order item

**PUT** `/order-items/:id`

Description: Requires token. Update an existing order item by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |
| Content-Type | application/json |

Body:

```json
{
  "order_id": 1,
  "product_id": 1,
  "quantity": 15,
  "price": 2500
}
```

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order item updated successfully",
  "data": {
    "id": 1,
    "order_id": 1,
    "product": "Indomie Goreng",
    "quantity": 15,
    "price": 2500
  }
}
```

#### Response - 400 Bad Request

```json
{
  "success": false,
  "status_code": 400,
  "message": "Validation error",
  "errors": {
    "quantity": "Quantity must be a positive number",
    "price": "Price must be a positive number"
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---

### 5. Delete an order item

**DELETE** `/order-items/:id`

Description: Requires token. Delete an existing order item by ID.

#### Request

Headers:
| Key | Value |
|-----|-------|
| Authorization | Bearer `<token>` |

#### Response - 200 OK

```json
{
  "success": true,
  "status_code": 200,
  "message": "Order item deleted successfully",
  "data": {
    "id": 1,
    "order_id": 1,
    "product": "Indomie Goreng",
    "quantity": 10,
    "price": 2500
  }
}
```

#### Response - 401 Unauthorized

```json
{
  "success": false,
  "status_code": 401,
  "message": "Unauthorized / Invalid token"
}
```

#### Response - 403 Forbidden

```json
{
  "success": false,
  "status_code": 403,
  "message": "Forbidden. You don't have access to this resource."
}
```

#### Response - 404 Not Found

```json
{
  "success": false,
  "status_code": 404,
  "message": "Data not found"
}
```

#### Response - 500 Server Error

```json
{
  "success": false,
  "status_code": 500,
  "message": "Internal server error"
}
```

---
