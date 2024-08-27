# City Management API

This project is a Node.js and Express-based RESTful API designed for managing city data. The API interacts with an SQLite database to perform CRUD (Create, Read, Update, Delete) operations on city records, along with search, sorting, and pagination functionalities.

## Project Overview

The City Management API allows users to:

- **Add** new cities.
- **Update** existing city records.
- **Delete** cities by ID.
- **Retrieve** a list of cities with options to search by name or country, sort by various fields, and paginate results.

## Setup and Run Instructions

### Prerequisites

Ensure that the following are installed on your system:

- **Node.js** (version 14 or later)
- **SQLite3**

### Steps to Set Up and Run the Project

1. **Clone the repository:**
   git clone https://github.com/vkonga/exelon-circuits-backend.git
    cd exelon-circuits-backend

### Install the necessary dependencies:

npm install sqlite express sqlite3 cors nodemon

### Set up the SQLite database:

Create an SQLite database file named city.db:

sqlite3 city.db
Run the following SQL command to create the city table:

CREATE TABLE city (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  population INTEGER,
  country TEXT,
  latitude REAL,
  longitude REAL
);

The server will be accessible at http://localhost:3000.

### Testing APIs Using Postman

### Step 1: Import the Postman Collection
postman: https://www.postman.com/altimetry-technologist-68303392/workspace/exelon/collection/34273290-428c2532-3bf1-4c77-b188-12d18d6526ae?action=share&source=copy-link&creator=34273290

Step 2: Test the API Endpoints
POST /cities: To add a new city.
PUT /cities/: To update an existing city by its ID.
DELETE /cities/: To delete a city by its ID.
GET /cities: To retrieve a list of cities, with options for search, sorting, and pagination.

Example Request to Add a City:

POST http://localhost:3000/cities
Content-Type: application/json

{
  "id": 1,
  "name": "Sample City",
  "population": 100000,
  "country": "Sample Country",
  "latitude": 12.34,
  "longitude": 56.78
}

PUT http://localhost:3000/cities/1
Content-Type: application/json

{
  "id": 1,
  "name": "Sample",
  "population": 100000,
  "country": "Sample Country",
  "latitude": 12.34,
  "longitude": 56.78
}

DELETE http://localhost:3000/cities/1

GET http://localhost:3000/cities


