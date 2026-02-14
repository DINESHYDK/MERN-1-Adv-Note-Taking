import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoute.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
    origin: "http://localhost:5173" // For now just the local variable, after hosting i will use the env variable
}));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => { // This will run the server on port 5001
        console.log('server is running on port: ', PORT);
    });
});

/*
-> Hey teach me about this middleware?
-> Middleware is a piece of code that runs before the request reaches the route handler
-> It can be used to manipulate the request and response objects
-> It is a function that takes the request object as an argument and has access to the response object through the next function
-> Middleware functions are executed in the order they are added to the application
-> We can use built-in and third-party middleware modules
-> We can also create our own middleware functions.
*/


// What is an End Point?
// An end point is a specific URL + HTTP that will direct us to a specific resource
//Let's build a simple route

// So, in this method we manipulate the data in the database.
// This was good for simple project, but what happens when the code was really
// large, so we ae going to create separate routes folder
