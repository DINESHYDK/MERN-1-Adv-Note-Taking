import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoute.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173", // Reads from .env — change only there when deploying

    }));
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
}

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
