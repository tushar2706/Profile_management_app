# User Registration and Profile Management App

# Introduction
This project is made to build APIs for a mobile app that has the following features:

1. OTP-based Login/Signup
The user enters their email address and receives a 6-digit OTP which they use to log in to the system. An account is created for the user if no account is mapped to the email address.

2. Profile View and Update
The user can view their profile, along with their photo on the profile screen. The user can update their profile with the following fields:

First Name (required, max 40 chars)

Last Name (required, max 40 chars)

City (must be available in the database, and belong to the selected state)

State (must be available in the database, and belong to the selected country)

Country (must be available in the database)


3. Upload Photograph
The user can also upload a photograph from their camera or phone library. The maximum image size allowed is 5MB.

To implement these features, I created APIs using a server-side framework like Node.js, with MongoDB database to store the user's information. I used libraries like JWT to authenticate the user and  multer to handle file uploads.

In the server-side code, I created API endpoints to handle the different functionalities, such as '/login', '/signup', '/profile', and '/user/photo', etc.

For example, the '/login' endpoint receives the email address, validate them, and return an access token to authenticate subsequent requests. The '/signup' endpoint creates a new user account if the email is not already in use, and send the OTP to the user.

The '/profile' endpoint can handle GET and PUT requests to view and update the user's profile information. The endpoint can validate the fields and update the database if they are valid.

The '/user/photo' endpoint can handle file uploads and save the file to the server. It can also validate the file size and format before storing it in the database.

# Getting Started
## Installation steps

We will first install a few dependencies:
```
npm i express mongoose nodemon dotenv
```
Here,

1.Express will be used for the middleware to create various CRUD endpoints.

2.Mongoose for managing data in MongoDB using various queries.

3.Nodemon to restart our server every time we save our file.

4.Dotenv to manage a .env file.

---
## Basic Setup
After they have finished installing, create one file named server.js. This will be the entry point for our application.

And in this file, let's add Express and Mongoose, and run the file.

```
const express = require('express');
const mongoose = require('mongoose');
```

Now, transfer the contents of Express into a new constant called app.

```
const express = require('express');
const mongoose = require('mongoose');

const app = express();
```
Now, let's listen the changes of this file on port 80.
```
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(100, () => {
    console.log(`Server Started at ${100}`)
})
```
## Connect mongodb in our application

After copying the string from MongoDb compass,

We will add our username and password to this string.
The final connecting string will look something like this:
```
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db2'
```
Here, tusharagrawal2706 is the username, followed by the password, and last is the database name.

So, paste this string into the .env file.
```
DATABASE_URL = 
'mongodb+srv://tusharagrawal2706:******@cluster0.bcfzcjv.mongodb.net/test_db2'
```

Now, let's import the contents of our .env file in the script file, server.js.
```
require('dotenv').config();


const mongoString = process.env.DATABASE_URL
```
Here, we are storing the string into a variable called mongoString.

Now, let's connect the database to our server using Mongoose.
```
mongoose.connect(mongoString);
const database = mongoose.connection
```
Now, we have to throw a success or an error message depending on whether our database connection is successful or fails.
```
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
```
Here, database.on means it will connect to the database, and throws any error if the connection fails. And database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.

---

## Create our Routes for the Endpoints
Create a folder called routes, and inside make a file called route.js.

Import this file into our main script file, server.js.
```
const routes = require('./routes/route');
```
Also, let's use this routes file.
```
const routes = require('./routes/route');

app.use('/api', routes)
```
Here, this app.use takes two things. One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.

We will get an error because we don't have anything inside the routes file. So, let's add them.
```
const express = require('express');

const router = express.Router()

module.exports = router;
```

#### Language used : JS

#### Frameworks used : Express.js

#### DB used : MongoDB

#### Authentication Library used: JWT

---
## Refrences

https://www.youtube.com/watch?v=1yqNfqfZPB8

https://www.youtube.com/watch?v=EVOFt8Its6I

https://stackoverflow.com/

