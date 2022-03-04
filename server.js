

// Import Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Declare JSON body Parser
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance - it helps server and app talk without any interuptions
const cors = require('cors');
app.use(cors());

// Initialize the main project folder - to direct server to look into this folder
app.use(express.static('website'));

// Declare the port to be used
const port = 8000;
// Setup Server
const server = app.listen(port, listening);

// callback function
function listening(){
    console.log(`Server is running at localhost and port: ${port}`);
}

// ROUTES

// POST Route


// GET Route

app.post('/add', async (req, res) => {
    projectData = await req.body; 
    console.log(projectData);
    res.send(projectData);
})