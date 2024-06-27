import "dotenv";
import express from "express";
import cors from "cors";
import RateLimit from 'express-rate-limit';
import bodyParser from "body-parser";
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import Routes from './routes/index.js'
import './database.js';

const frontendUrl = 'http://localhost:5173'

const app = express();

app.use(cors({
    origin: frontendUrl, // Allow requests from this origin
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true // If you need to allow credentials (cookies, authorization headers, etc.)
}));

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});

const PORT = process.env.PORT;

app.use(limiter);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
    Routes(app);
    
    app.use(notFound)
    app.use(errorHandler)
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
