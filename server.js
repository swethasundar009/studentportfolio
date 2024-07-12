const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'student-portfolio')));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentportfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

// Define schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const User = mongoose.model('User', userSchema);

// Serve HTML file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'student-portfolio/studentportfolio.html'));
});

// Handle form submission
app.post('/post', async (req, res) => {
    const { name, email, message } = req.body;
    const user = new User({
        name,
        email,
        message
    });
    try {
        await user.save();
        console.log('Form submission successful:', user);
        res.json({ message: 'Form submission successful' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Form submission failed' });
    }
});

// Start the server
app.listen(port, function() {
    console.log(`Server is running on http://localhost:${port}`);
});
