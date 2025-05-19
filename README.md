# API-Marketplace
API-Marketplace is a backend service built with **NestJS** designed for a marketplace platform. This API allows sellers to manage their products, buyers to interact with products, and administrators to manage users. The API supports user registration, login, product management, and seller-related operations.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Products](#products)
- [Running the App Locally](#running-the-app-locally)
- [Details](#details)

## Deployment
The deployment was made on render 
```bash
https://marketpro-api.onrender.com
```

## Installation
To get started with API-Marketplace, follow these steps:

Clone the repository:

```bash
git clone https://github.com/marketPro-api.git
cd API-MARKETPLACE
```

Install dependencies:
```bash
npm install
```
Setup Environment Variables:

Make sure to create a .env file in the root of your project and configure it with the necessary environment variables, such as:

```plaintext
DB_HOST=your-database-host
DB_PORT=5432
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
CLOUDINARY_API_KEY=cloudinary-api-key
CLOUDINARY_API_SECRET=cloudinary-api-secret
```

Run the application:

```bash
npm run start
```

## API Endpoints
To access to a more detailed description of all of the endpoints, enter to this URL:
```bash
{url}/api-docs/
```
### Auth
```POST /api/v1/auth/login```

Body:

```json
{
    "email": "string",
    "password": "string"
}
```
Description: Logs in an existing user and returns an accessToken along with the user's role, name, and id.

Response Example:

```json
{
    "accessToken": "ashdsakgkjsgaskgodkajihutqhwethqwe",
    "user": {
        "id": 1,
        "name": "John Doe",
        "role": "seller"
    }
}
```

### Users
```POST /api/v1/users/register```

Body:

```json
{
    "email": "string",
    "name": "string",
    "password": "string",
    "confirmPassword": "string",
    "role": "admin" | "seller" | "buyer"
}
```

Description: Registers a new user with role-based access. Passwords must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.

Response Example:

```json
{
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "seller"
}
```

```GET /api/v1/users/sellers```

Description: Retrieves a list of all users with the role of "seller".

Response Example:

```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "seller"
    }
]
```

### Products
```POST /api/v1/products```

Body:

```json
{
    "sku": "string",
    "name": "string",
    "price": "number",
    "rating": "number",
    "image": "File",
    "featured": "boolean",
    "stock": "number",
    "sellerId": "number"
}
```
Description: Creates a new product associated with a seller. The `sellerId` should correspond to a seller's ID in the system.

Response Example:

```json
{
    "id": 1,
    "sku": "SKU123",
    "name": "Product Name",
    "price": 199.99,
    "rating": 4.5,
    "image": "image_url",
    "featured": true,
    "stock": 100,
    "sellerId": 1
}
```
```GET /api/v1/products```

Description: Fetches all products in the system.

Response Example:
```json
[
    {
        "id": 1,
        "sku": "SKU123",
        "name": "Product Name",
        "price": 199.99,
        "rating": 4.5,
        "image": "image_url",
        "featured": true,
        "stock": 100,
        "sellerId": 1
    }
]
```

``` GET /api/v1/products/{id}```

Description: Retrieves detailed information for a specific product by ID.

Response Example:

```json
{
    "id": 1,
    "sku": "SKU123",
    "name": "Product Name",
    "price": 199.99,
    "rating": 4.5,
    "image": "image_url",
    "featured": true,
    "stock": 100,
    "sellerId": 1
}
```
```PATCH /api/v1/products/{id}```

Body:

```json
{
    "sku": "string",
    "name": "string",
    "price": "number",
    "rating": "number",
    "image": "File",
    "featured": "boolean",
    "stock": "number",
    "sellerId": "number"
}
```

Description: Updates the product's details by product ID. Any field is optional.

```DELETE /api/v1/products/{id}```

Description: Removes a product from the system by ID.

```GET /api/v1/products/seller/{id}```

Description: Retrieves all products from a specific seller by sellerId.

## Running the App Locally

Make sure you have Docker installed (for running the database locally).

Setup a database container:

```bash
docker-compose up -d
```

Start the server:

```bash
npm run start:dev
```
Now you should have the application running locally on http://localhost:3000.

## Details

- To upload images to the system I used https://cloudinary.com/.
- JWT to generate access tokens when users log in the system.
