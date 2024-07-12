# Student Portfolio Site

This project is a static website template for a student portfolio. It includes backend functionality powered by Node.js, Express.js, and MongoDB, allowing for dynamic features like a contact form with data storage capabilities. The site is designed with sections such as home, about, portfolio, and contact, tailored to showcase student projects and accomplishments.

## Table of Contents

- [Description](#Description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Images](#Images)
- [Styling](#Styling)
- [HTML Tags](#HTMLTags)
- [JavaScript Functions](#JavaScriptFunctions)
- [Project Explanation ](#project-explanation)
- [Installation](#Installation)
- [Backend Setup](#Backend-Setup)
    * [Server.js](#Server.js)
    * [package.json](#package.json)
    * [package-lock.json](#package-lock.json)
    * [node_modules](#node_modules)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [License](#License)



## Description

This repository contains HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB files to create a dynamic student portfolio website. It includes a responsive design suitable for various screen sizes and devices, showcasing skills, projects, and contact information. The backend functionality is powered by Node.js and Express.js, enabling features such as form submission and data storage in MongoDB. Sections like home, about, portfolio, and contact are tailored to effectively present student projects and accomplishments.

## Features

- **Responsive Design:** The website is fully responsive and adapts to different screen sizes.
- **Interactive UI:** Includes dynamic elements such as a hero section, portfolio grid, and contact form.
- **Navigation Menu:** A fixed navigation menu with a hamburger icon for mobile devices.
- **Sections:** Home, About, Portfolio, and Contact sections.

 
## Technologies Used
+ HTML
- CSS
* JavaScript
+ Node.js
- Express.js
* MongoDB

## Images

* logo.jpg: Personal logo.
* html,css,js.jpg: Represents web development technologies in the project section.
* flutter.jpg: Represents the Flutter framework in the project section.
* python.jpg: Represents Python programming in the project section.

## Styling

| CSS Property | Description |
| ------ | ----------- |
| color   | 	Sets the color of text. |
| background-color| Sets the background color of an element.|
| font-family| Specifies the font for an element.. |
| margin| Sets the margin outside an element. |
| padding| Sets the padding inside an element. |
| border| Sets the border around an element.|

## HTML Tags

| HTML Tag | Purpose |
| ------ | ----------- |
| header   | Defines a header for a document or section.	|
| nav| Defines navigation links.|
| section| Defines a section in a document. |
| article |Defines an article.. |
| footer| 	Defines a footer for a document or section.|
| img| Embeds an image in the document.|
| a| Defines a hyperlink.|

## JavaScript Functions

| Function Name | Description |
| ------ | ----------- |
| toggleMenu   | 	Toggles the visibility of the navigation menu.	|
| validateForm| 	Validates the contact form before submission.|
| showProject| 	Displays the details of a selected project. |
| scrollToTop | Smoothly scrolls the page back to the top. |

## Project Explanation

 *This portfolio project is designed to showcase the skills and projects we offer for students. It includes the following sections:*

*Home: An introduction to the portfolio.*

*About: The About section provides details about our Prince Academy. It includes information about our background, our educational offerings, and the skills we teach our students.*

*Portfolio: A gallery of projects with descriptions and images. The Portfolio section contains projects we teach and the skills students acquire in our institute. Each project is displayed with a description and images showcasing the students' work.*

*Contact: A contact form where users can enter their name, email, and a message*


## Installation

### Prerequisites

- A web browser (e.g., Chrome, Firefox)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- MongoDB Compass

### Steps

 #### 1. Clone the repository

   Open your terminal or command prompt and navigate to the directory where you want to clone the repository. Then, run the following command:

   ```sh
   git clone https://github.com/swethasundar009/student-portfolio-website
   ```
   
 #### 2. Navigate to the Project Directory

Once the repository is cloned, navigate to the project directory:

   ```sh
  cd Student-Portfolio-Site
   ```

 #### 3.Install Visual Studio Code

If you haven't installed VS Code yet, download and install it from the official website.

 #### 4. Open the Project in VS Code

Open Visual Studio Code, then open the project directory. You can do this by selecting File > Open Folder and navigating to the StudentPortfolio directory.

 #### 5. Review the Project Structure

Take a look at the project structure and familiarize yourself with the different files and folders.

 #### 6. Run the Project

To run the project, open the studentportfolio.html file in a web browser. You can do this by dragging and dropping the file into a browser window or by using a live server extension available in VS Code.

**If you prefer using the live server extension in VS Code:**

* Install the Live Server extension.
* Right-click the studentportfolio.html file and select Open with Live Server.

## Usage
Navigate through the site to view contact information and other sections.

## Backend Setup
To handle form submissions and connect the contact form to a MongoDB database, follow these steps:

#### Installation 

#### Navigate to Desktop:
Open the command prompt and change directory to the Desktop.

```
cd desktop
```

#### Navigate to html-mongo Directory:
Change directory to the html-mongo folder on your Desktop.

```
cd html-mongo
```
#### Create server.js File:
Create a new server.js file in the current directory.

```
echo . server.js
```

#### Create studentportfolio.html File:
Create a new studentportfolio.html file in the current directory.
```
echo. studentportfolio.html
```

#### Initialize npm Project:
Initialize a new npm project with default settings.

```
npm init --yes
```

#### Install Dependencies:
Install Express, Mongoose, and Body Parser dependencies for the project.

```
npm i express mongoose body-parser
```

#### Open Project in VS Code:
Open the current directory in Visual Studio Code for editing.

```
code .
```

#### Start Server with Nodemon:
Start the server using Nodemon to automatically restart on file changes.

```
nodemon server.js
```

### server.js
*Create a file named server.js in the root directory of the project:*

Code

```
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
```

#### package.json
*Create a package.json file in the root directory of the project with the following content:*

code 

```
{
  "name": "student-portfolio-site",
  "version": "1.0.0",
  "description": "A static website template for a student portfolio",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongoose": "^5.12.3",
    "path": "^0.12.7"
  },
  "author": "Swetha Sundar",
  "license": "MIT"
}
```

### package-lock.json
The package-lock.json file is generated automatically when you run npm install and ensures consistent installs across different environments.

### node_modules
The node_modules directory contains all the installed dependencies for the project. This directory is generated automatically when you run npm install.

### Access the Website
Open your web browser and navigate to http://localhost:3000 to view the website and test the contact form functionality.

### MongoDB Compass

Submitted contact form data will be stored in the MongoDB Compass database.





	
	
	








