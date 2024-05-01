require('dotenv').config();
const port = process.env.PORT || 5000; 
const app = require("./app");
const connectdb = require("./db");

// Connection to the database
connectdb();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error("Server is not running due to some error", err);
});
