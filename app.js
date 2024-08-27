const express = require('express'); 
const app = express();    
const cors = require('cors');
const { open } = require('sqlite');
const path = require('path');
const sqlite3 = require('sqlite3');

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const dbPath = path.join(__dirname, "city.db");
let db = null;

// Function to initialize the database and server
const initializeDBAndServer = async () => {
    try {
        // Open the SQLite database
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        // Start the server on port 3000
        app.listen(3000, () => {
            console.log("Server Running at localhost:3000");
        });
    } catch (e) {
        // Handle database connection errors
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};

// Initialize the database and server
initializeDBAndServer();

// Route to add a new city
app.post("/cities",async (request, response) => {
  const { id,name, population, country, latitude, longitude } = request.body;

  const query = `INSERT INTO city (id,name, population, country, latitude, longitude) VALUES (${id},'${name}',${population},'${country}', ${latitude}, ${longitude})`;

  try {
    await db.run(query);
    response.status(201).json({ message: 'City added successfully', city: { name, population, country, latitude, longitude } });
  } catch (err) {
    response.status(400).json({ error: 'City name must be unique or error occurred' });
  }
});

// Route to update a city

app.put("/cities/:id",async (request, response) => {
  const { id } = request.params;
  const { name, population, country, latitude, longitude } = request.body;

  const query = `UPDATE city SET name = '${name}', population = ${population}, country = '${country}', latitude = ${latitude}, longitude = ${longitude} WHERE id = ${id}`;

  try {
    await db.run(query);
    response.json({ message: 'City updated successfully', city: { id, name, population, country, latitude, longitude } });
  } catch (err) {
    response.status(400).json({ error: 'Error updating city' });
  }
});

// Route to delete a city

app.delete("/cities/:id",async (request, response) => {
  const { id } = request.params;

  const query = `DELETE FROM city WHERE id = ${id}`;

  try {
    await db.run(query);
    response.json({ message: 'City deleted successfully' });
  } catch (err) {
    response.status(400).json({ error: 'Error deleting city' });
  }
});

// Route to get a city

app.get("/cities",async (request, response) => {
  const { search, sortBy = 'name', order = 'ASC', limit = 10, offset = 0 } = request.query;

  let query = `SELECT * FROM city`;
  const params = [];

  if (search) {
    query += ` WHERE name LIKE ? OR country LIKE ?`;
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ` ORDER BY ${sortBy} ${order}`;

  if (limit) {
    query += ` LIMIT ?`;
    params.push(parseInt(limit, 10));
  }

  if (offset) {
    query += ` OFFSET ?`;
    params.push(parseInt(offset, 10));
  }

  try {
    const rows = await db.all(query,params);
    response.json({ cities: rows });
  } catch (err) {
    response.status(400).json({ error: 'Error retrieving cities' });
  }
});
